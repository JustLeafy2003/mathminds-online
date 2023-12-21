/**
 * Context provider for managing socket connections and video calls.
 * @module ContextProvider
 * @type {function}
 * @param {object} props - React component props.
 * @param {JSX.Element} props.children - Child components wrapped by the ContextProvider.
 * @returns {JSX.Element} - React context provider for socket and video call management.
 */
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io.connect("http://127.0.0.1:3001");

/**
 * Main context provider for socket and video call management.
 * @function
 * @param {object} props - React component props.
 * @param {JSX.Element} props.children - Child components wrapped by the ContextProvider.
 * @returns {JSX.Element} - React context provider for socket and video call management.
 */
const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  // local stream 
  const [stream, setStream] = useState();
  // remote stream
  const [userStream, setUserStream] = useState();
  
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [loadMyCamera, setLoadMyCamera] = useState(null);

  // local video
  const myVideo = useRef();
  // remote video 
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    startCall();
  }, []);

  /**
   * Start the socket connection and set up event listeners.
   * @function
   */
  const startCall = () => {
    try {
      socket.on('me', (id) => setMe(id));

      socket.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
    } catch (error) {
      console.error(error);

    }
  }

  /**
   * Answer call via the socket connection.
   * @function
   */
  const answerCall = () => {
    try {
      setCallAccepted(true);

      const peer = new Peer({ 
        initiator: false, trickle: false, stream });

      peer.on('signal', (data) => {
        socket.emit('answerCall', 
        { signal: data, to: call.from });
      });

      peer.on('stream', (currentStream) => {
        //userVideo.current.srcObject = currentStream;
        setUserStream(currentStream);
      });

      peer.signal(call.signal);

      connectionRef.current = peer;
    } catch (error) {
      console.error(error);
    }
  };
  
  /**
   * Initiate a call to a user via the socket connection.
   * @function
   * @param {string} id - User ID to call.
   */
  const callUser = (id) => {
    try {
      const peer = new Peer({ 
        initiator: true, trickle: false, stream });

      peer.on('signal', (data) => {
        socket.emit(
          'callUser', 
          { 
            userToCall: id, 
            signalData: data, from: me, name 
          });
      });

      peer.on('stream', (currentStream) => {
        //userVideo.current.srcObject = currentStream;
        setUserStream(currentStream);
      });

      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);

        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * End the ongoing call via the socket connection.
   * @function
   */
  const leaveCall = () => {
    setCallEnded(true);
    try {
      if (connectionRef.current) {
        connectionRef.current.destroy();
        connectionRef.current = null;
      }
      if (stream) {
        stream.getTracks().forEach(
          (track) => track.stop());
      }

      if (userStream) {
        userStream.getTracks().forEach(
          (track) => track.stop());
      }
    } catch (error) {
      console.error(error);
    } finally {
      //window.location.reload();
    }

  };


  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      setCallAccepted,
      myVideo,
      userVideo,
      stream,
      setStream,
      userStream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setLoadMyCamera,
      loadMyCamera
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
