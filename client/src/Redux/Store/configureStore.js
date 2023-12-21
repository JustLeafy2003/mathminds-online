/**
 * Configuration for the Redux store.
 * @module configureStore
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import UserService from '../../Services/UserService';
import { toast } from 'react-toastify';

// Import your reducers
import userReducer from '../Reducers/userReducer';
import videoReducer from '../Reducers/videoReducer';

const sagaMiddleware = createSagaMiddleware();

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  // Add other reducers as needed
});

/**
 * Saga for handling user login asynchronously.
 * @function
 * @param {object} action - Redux action containing user data for login.
 */
function* loginUserAsyncSaga(action) {
  try {
    const response = yield UserService.authenticate(action.payload);
    const authenticatedUser = response?.data?.user;

    if (authenticatedUser) {
      yield put({ type: 'LOGIN_USER', payload: authenticatedUser });

      toast.success('Successfully logged in to Mathminds Online', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
      });

      // Additional logic if needed
    } else {
      console.error('Authentication failed:', response?.data?.message);
      // Handle authentication failure (optional)
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Handle error (optional)
  }
}

/**
 * Saga for handling user registration asynchronously.
 * @function
 * @param {object} action - Redux action containing user data for registration.
 */
function* registerUserAsyncSaga(action) {
  try {
    const response = yield UserService.registerUser(action.payload);

    if (response.status === 201) {
      const authenticatedUser = response.data.user;
      yield put({ type: 'LOGIN_USER', payload: authenticatedUser });

      toast.success('Registration successful', {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      // Additional logic if needed
    } else {
      toast.error('Registration failed', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    toast.error('Registration failed', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
}

/**
 * Root saga function combining all sagas.
 * @function
 */
function* rootSaga() {
  yield takeEvery('LOGIN_USER_ASYNC', loginUserAsyncSaga);
  yield takeEvery('REGISTER_USER_ASYNC', registerUserAsyncSaga);
}

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
