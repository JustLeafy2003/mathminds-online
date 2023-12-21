/**
 * Redux actions related to user data.
 * @module userActions
 */

// Action types
export const SET_USERS = 'SET_USERS';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_ASYNC = 'LOGIN_USER_ASYNC'; // New action type for async login
export const REGISTER_USER_ASYNC = 'REGISTER_USER_ASYNC'; // New action type for async register

/**
 * Action creator for logging in a user.
 * @function
 * @param {object} user - User object to be logged in.
 * @returns {object} - Redux action for user login.
 */
export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

/**
 * Action creator for logging out a user.
 * @function
 * @returns {object} - Redux action for user logout.
 */
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

/**
 * Action creator for setting users.
 * @function
 * @param {object} users - List of users.
 * @returns {object} - Redux action for setting users.
 */
export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users,
});


/**
 * Action creator for deleting a user.
 * @function
 * @param {object} userId - ID of the selected user to be deleted.
 * @returns {object} - Redux action for deleting specified user.
 */
export const deleteUser = (userId) => ({
  type: 'DELETE_USER',
  payload: userId,
});

/**
 * Async action creator for user login.
 * @function
 * @param {object} userData - The user data for login.
 * @returns {object} Action object with the type and payload.
 */
export const loginUserAsync = (userData) => ({
  type: LOGIN_USER_ASYNC,
  payload: userData,
});

/**
 * Async action creator for user registration.
 * @function
 * @param {object} userData - The user data for registration.
 * @returns {object} Action object with the type and payload.
 */
export const registerUserAsync = (userData) => ({
  type: REGISTER_USER_ASYNC,
  payload: userData,
});