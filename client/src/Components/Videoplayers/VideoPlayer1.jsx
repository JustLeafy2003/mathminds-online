import React, {useState} from 'react';
import VideoPlayer from '../VideoPlayer';
import { getLocalStorageUser } from "../../Utils/localStorageUtils";

/**
 * Component representing the first video player.
 * @component
 */
const VideoPlayer1 = () => {
    const [videoOn, setVideoOn] = useState(false);

    const userData = getLocalStorageUser();

      /**
   * Handles the toggle camera action for VideoPlayer1.
   * Toggles the camera on or off based on the current state.
   * @function
   */
    const handleToggleCamera1 = async () => {
      try {
        if (!videoOn) {
          console.log("Turning camera on");
          await VideoPlayer.openVideo();
        } else {
          console.log("Turning camera off");
          VideoPlayer.closeVideo();
        }
        setVideoOn((prevVideoOn) => !prevVideoOn); // Update videoOn state
        VideoPlayer.onToggleCamera();
      } catch (error) {
        console.log(error);
      }
    };
  
    // const handleToggleCamera1 = () => {
    //   // Implement the logic specific to VideoPlayer1
    //   console.log("Toggling camera for player 1");
    //   setVideoOn((prevVideoOn) => !prevVideoOn);
    // };
  
    return (
      <VideoPlayer
        name={userData.Name}
        onToggleCamera={handleToggleCamera1}
        enableToggleCamera={true}
        isVideoOn={videoOn}
      />
    );
  };

export default VideoPlayer1;