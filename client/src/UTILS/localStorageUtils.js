/**
 * Utility functions for working with localStorage related to user data.
 * @module localStorageUtils
 */

/**
 * Get the parsed user object from localStorage.
 * @function
 * @returns {object|null} - Parsed user object from localStorage.
 */
const getLocalStorageUser = () =>{
    const parseUser = JSON.parse(localStorage.getItem("user"));
    return parseUser;
}

/**
 * Set the user object in localStorage.
 * @function
 * @param {object} user - User object to be stored in localStorage.
 */
const setLocalStorageUser = (user) =>{
    localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Get the authentication token from the user stored in localStorage.
 * @function
 * @returns {string|null} - Authentication token.
 */
const getToken = () => {
    const parsedUser = getLocalStorageUser();
    return parsedUser.token;
  };

module.exports = {
    getLocalStorageUser,
    setLocalStorageUser,
    getToken,
}