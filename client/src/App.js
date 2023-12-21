/**
 * Main application component handling routing and page rendering.
 * @module App
 * @type {function}
 * @returns {JSX.Element} - Root application component.
 */
import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector, Provider } from "react-redux";
import UserTable from './Pages/Leaderboard';
import AboutUs from './Pages/AboutUs';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import Singleplayer from './Pages/SinglePlayer';
import Multiplayer from './Pages/Multiplayer';
import './App.css';
import HomePage from "./Pages/HomePage";
import ModeSelection from "./Pages/ModeSelection";
import { ContextProvider } from './Utils/context';
import Footer from './Components/Footer';
import Navigation from './Components/Navigation';
import { ThemeProvider, useTheme } from "./ThemeProvider";
import { useNavigate } from 'react-router-dom';
import UserProfile from './Pages/UserProfile';
import UserService from './Services/UserService';
import { loginUser, logoutUser } from './Redux/Actions/userActions';
import store from './Redux/Store/configureStore';

/**
 * PrivateRoute functional component.
 * @param {object} props - React component props.
 * @param {JSX.Element} props.element - The component to render if the user is logged in.
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @returns {JSX.Element} - The component to render based on login status.
 */
const PrivateRoute = ({ element, isLoggedIn }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
};

/**
 * Main App functional component.
 * @function
 * @returns {JSX.Element} - Root application component.
 */
function App() {
    const { darkTheme, toggleTheme } = useTheme();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const toggleNavCollapse = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    const handleRegister = async (userData) => {
        try {
            const response = await UserService.registerUser(userData);

            if (response.status === 201) {
                toast.success("Registration successful", {
                    position: toast.POSITION.BOTTOM_LEFT,
                });

                // Set user as logged in (if needed)
                dispatch(loginUser(response.data.user));
            } else {
                toast.error("Registration failed", {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Registration failed", {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };

    const handleLogin = (user) => {
        dispatch(loginUser(user));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem('user');
    };

    return (
        <div className={`${darkTheme ? "dark-theme " : ""}App`} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navigation
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isNavCollapsed={isNavCollapsed}
                setIsNavCollapsed={setIsNavCollapsed}
            />

            <div className="container mt-3" style={{ flex: 1 }}>
                <Routes>
                    <Route path="/leaderboard" element={<PrivateRoute element={<UserTable />} isLoggedIn={isLoggedIn} />} />
                    <Route path="/aboutus" element={<PrivateRoute element={<AboutUs />} isLoggedIn={isLoggedIn} />} />
                    <Route path="/profile" element={<PrivateRoute element={<UserProfile />} isLoggedIn={isLoggedIn} />} />
                    <Route path="/singleplayer" element={<PrivateRoute element={<Singleplayer />} isLoggedIn={isLoggedIn} />} />
                    <Route path="/multiplayer" element={<PrivateRoute element={<Multiplayer />} isLoggedIn={isLoggedIn} />} />
                    <Route path="/login" element={<SignIn onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register onLogin={handleRegister} />} />
                    <Route path="/" element={isLoggedIn ? <ModeSelection /> : <HomePage />} />
                </Routes>

                <ToastContainer />
            </div>
            <Footer />
        </div>
    );
}

/**
 * Wrapper for the App component that includes the ThemeProvider and Redux Provider.
 * @function
 * @returns {JSX.Element} - App component with theme and Redux providers.
 */
export default function AppWithThemeProvider() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ContextProvider>
          <Router>
            <App />
          </Router>
        </ContextProvider>
      </ThemeProvider>
    </Provider>
  );
}
