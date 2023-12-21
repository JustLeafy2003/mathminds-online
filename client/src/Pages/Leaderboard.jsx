// Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUsers, deleteUser } from '../Redux/Actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

/**
 * UserTable Component - Displays a leaderboard table with user information.
 * @component
 * @param {Object} props - Component properties
 * @param {Array} props.users - Array of user objects
 * @param {Function} props.setUsers - Redux action to set users
 * @param {Function} props.deleteUser - Redux action to delete a user
 * @returns {JSX.Element} UserTable component
 */
const UserTable = ({ users, setUsers, deleteUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  /**
 * Asynchronously loads and sets the list of users, sorted by the number of wins.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
  const loadUsers = async () => {
    try {
      const response = await UserService.getAll();
      const users = Array.isArray(response.data.users) ? response.data.users : [];
      const sortedUsers = users.sort((a, b) => b.Wins - a.Wins);
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleConfirmDelete = () => {
    UserService.remove(selectedPersonId)
      .then((res) => {
        toast.success(res?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        loadUsers();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to delete person');
      })
      .finally(() => {
        setShowModal(false);
        setSelectedPersonId(0);
        deleteUser(selectedPersonId);
      });
  };

  const selectClickHandler = (event, person) => {
    navigate({
      pathname: `/userForm`,
      state: { user: person },
    });
  };

  const deleteClickHandler = (event, id) => {
    setSelectedPersonId(id);
    setShowModal(true);
  };

  /**
 * Event handler for changing the page in a paginated component.
 *
 * @param {Event} event - The event object.
 * @param {number} newPage - The new page number.
 * @returns {void}
 */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

/**
 * Event handler for changing the number of rows displayed per page in a paginated component.
 *
 * @param {Event} event - The event object.
 * @returns {void}
 */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h3>Leaderboard (sorted by wins)</h3>
      <TableContainer component={Paper}>
        <Table aria-label="question table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell>Wins</TableCell>
              <TableCell>Losses</TableCell>
              <TableCell>Admin?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((person) => (
                <TableRow key={person.ID}>
                  <TableCell>{person.ID}</TableCell>
                  <TableCell>{person.Name}</TableCell>
                  <TableCell>{person.Bio}</TableCell>
                  <TableCell>{person.Wins}</TableCell>
                  <TableCell>{person.Losses}</TableCell>
                  <TableCell>{person.Admin ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className="footer text-center w-100">
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                colSpan={8}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.user ? state.user.users || [] : [],
});

const mapDispatchToProps = {
  setUsers,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
