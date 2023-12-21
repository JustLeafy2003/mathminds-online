/**
 * Redux reducer for user-related actions.
 * @module userReducer
 */
import { LOGIN_USER, LOGOUT_USER, SET_USERS } from '../Actions/userActions';

const initialState = {
  user: [],
  isLoggedIn: false,
};

/**
 * User reducer function.
 * @function
 * @param {object} state - Current state.
 * @param {object} action - Redux action.
 * @returns {object} - New state.
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
