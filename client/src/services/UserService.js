/**
 * Service for handling user-related API calls.
 * @module userService
 */

import http from "../http-common";
import {getToken} from "../Utils/localStorageUtils"

/**
 * Authenticate a user.
 * @function
 * @param {object} user - User object for authentication.
 * @returns {Promise<object>} - Promise that resolves to the authentication response.
 */
const authenticate = async (user) => {
  try {
    const response = await http.post(`/auth/authenticate`, user);
    return response;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw new Error('Authentication failed');
  }
};

/**
 * Register a new user.
 * @function
 * @param {object} userData - User data for registration.
 * @returns {Promise<object>} - Promise that resolves to the registration response.
 */
const registerUser = async (userData) => {
  try {
     const response = await http.post('/register/register', userData);
     return response.data;
  } catch (error) {
     throw new Error('Registration failed');
  }
};

/**
 * Fetches all users from the server.
 * @function
 * @returns {Promise} A promise that resolves to the response data containing user information.
 */
  const getAll = () =>{
    return http.get(`auth/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

/**
 * Checks if a username already exists on the server.
 * @async
 * @function
 * @param {string} username - The username to check for existence.
 * @returns {Promise} A promise that resolves to the response data indicating whether the username exists.
 * @throws {Error} Throws an error if the request fails.
 */
const checkUsernameExists = async (username) => {
  try {
    const response = await http.get(`/auth/checkUsernameExists/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches data for the currently logged-in user from the server.
 * @async
 * @function
 * @returns {Promise} A promise that resolves to the response data containing user information.
 * @throws {Error} Throws an error if the request fails or if the status is not 200.
 */
const getLoggedInUserData = async () => {
  try {
    const response = await http.get('/auth/users', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const UserService = {
  getAll,
  authenticate,
  registerUser,
  checkUsernameExists,
  getLoggedInUserData,
};

export default UserService;