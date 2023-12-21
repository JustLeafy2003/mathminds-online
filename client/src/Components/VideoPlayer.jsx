// VideoPlayer.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toggleCamera, setVideoOn } from '../Redux/Actions/videoActions';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import { SocketContext } from '../Utils/context';
import { FiCameraOff, FiCamera } from 'react-icons/fi';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
import '@tensorflow-models/blazeface';
import * as blazeface from '@tensorflow-models/blazeface';

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '10px',
  border: '2px solid black',
  margin: '10px',
}));

/**
 * Component representing the VideoPlayer with camera feed and face detection.
 * @component
 */
const VideoPlayer = ({ name, onToggleCamera, enableToggleCamera, isVideoOn }) => {
  const { stream, setStream } = useContext(SocketContext);
  const myV = useRef();
  const [videoOn, setVideoOn] = useState(false);
  const [prevVideoOn, setPrevVideoOn] = useState(false);
  const canvasRef = useRef(null);
  let model;

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        model = await blazeface.load();
        console.log("Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const detectFaces = async () => {
      if (myV.current && model && myV.current.videoWidth > 0 && myV.current.videoHeight > 0) {
        const video = myV.current;
        const predictions = await model.estimateFaces(video);
    
        console.log("Predictions:", predictions); // Log predictions to console
    
        if (predictions.length > 0) {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);
    
          predictions.forEach((prediction) => {
            const start = prediction.topLeft;
            const end = prediction.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];
    
            // Calculate the center of the face
            const centerX = start[0] + size[0] / 2;
            const centerY = start[1] + size[1] / 2;
    
            // Adjust the position to center the rectangle on the face
            const position = [centerX - size[0] / 2, centerY - size[1] / 2];
    
            // Scale the size of the rectangle (adjust the scale factor as needed)
            const scaledSize = [size[0] * 0.5, size[1] * 0.5];
    
            // Save the current state of the context
            context.save();
    
            // Translate the context to match the offset
            context.translate(-125, -175);
    
            context.beginPath();
            context.lineWidth = '2';
            context.strokeStyle = '#098765';
    
            // Use the scaled size and adjusted position for the rectangle
            context.rect(position[0], position[1], scaledSize[0], scaledSize[1]);
            context.fillStyle = 'transparent';
            context.fill();
            context.stroke();
    
            // Restore the context to its previous state
            context.restore();
          });
        }
      }
    };
  
    const interval = setInterval(detectFaces, 10);

    return () => {
      clearInterval(interval);
    };
  }, [model]);
  
  useEffect(() => {
    try {
      if (stream) {
        myV.current.srcObject = stream;
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };
  }, [stream, setStream]);

  const openVideo = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(currentStream);
    } catch (error) {
      console.log(error);
    }
  };

  const closeVideo = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleToggleCamera = async () => {
    try {
      if (!isVideoOn && enableToggleCamera) {
        console.log('Turning camera on');
        await openVideo();
      } else {
        console.log('Turning camera off');
        closeVideo();
      }
      setVideoOn(!isVideoOn); // Dispatching action to update Redux state
      onToggleCamera();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledGridContainer container>
      <StyledPaper>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "300px", height: "200px", overflow: "hidden" }}>
              <Typography color={"primary"} variant="h5">{name}</Typography>
              {stream && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <video
                    playsInline
                    muted
                    ref={myV}
                    autoPlay
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  ></video>
                  <canvas
                    ref={canvasRef}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                </div>
              )}
              {!stream && (
                <FiCameraOff
                  alt="No video available"
                  style={{ width: '75%', height: '75%' }}
                />
              )}
            </Box>
            <div style={{ textAlign: 'center' }}>
              <button
                className="btn camera"
                onClick={handleToggleCamera}
                disabled={!enableToggleCamera}
              >
                {videoOn ? (<FiCameraOff />) : (<FiCamera />)}
                {videoOn ? ' Turn camera off' : ' Turn camera on'}
              </button>
            </div>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledGridContainer>
  );
};

const mapStateToProps = (state) => ({
  isVideoOn: state.video.isVideoOn,
});

const mapDispatchToProps = {
  toggleCamera,
  setVideoOn,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);