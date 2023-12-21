/**
 * Redux actions related to video settings.
 * @module videoActions
 */

/**
 * Action creator for toggling the camera.
 * @function
 * @returns {object} - Redux action for toggling the camera.
 */
export const toggleCamera = () => ({
    type: 'TOGGLE_CAMERA',
  });
  
  /**
 * Action creator for setting the video state.
 * @function
 * @param {boolean} isVideoOn - Indicates whether the video is on.
 * @returns {object} - Redux action for setting the video state.
 */
  export const setVideoOn = (isVideoOn) => ({
    type: 'SET_VIDEO_ON',
    payload: isVideoOn,
  });
  