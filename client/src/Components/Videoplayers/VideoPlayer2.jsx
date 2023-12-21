import React, {useState} from 'react';
import VideoPlayer from '../VideoPlayer';

/**
 * Component representing the second video player.
 * @component
 */
const VideoPlayer2 = () => {
    const [videoOn, setVideoOn] = useState(false);
  
     /**
   * Handles the toggle camera action for VideoPlayer2.
   * Toggles the camera on or off based on the current state.
   * @function
   */
    const handleToggleCamera = () => {
      // Implement the logic specific to VideoPlayer2
      console.log("Toggling camera for player 2");
      setVideoOn((prevVideoOn) => !prevVideoOn);
    };
  
    return (
      <VideoPlayer
        name={"Waiting for player..."}
        onToggleCamera={handleToggleCamera}
      />
    );
  };

  export default VideoPlayer2;