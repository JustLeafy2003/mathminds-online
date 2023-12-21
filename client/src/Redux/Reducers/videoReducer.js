/**
 * Redux reducer for video-related actions.
 * @module videoReducer
 */
const initialState = {
    isCameraOn: false,
    isVideoOn: false,
  };
  
  /**
 * Video reducer function.
 * @function
 * @param {object} state - Current state.
 * @param {object} action - Redux action.
 * @returns {object} - New state.
 */
  const videoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_CAMERA':
        return {
          ...state,
          isCameraOn: !state.isCameraOn,
        };
      case 'SET_VIDEO_ON':
        return {
          ...state,
          isVideoOn: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default videoReducer;
  