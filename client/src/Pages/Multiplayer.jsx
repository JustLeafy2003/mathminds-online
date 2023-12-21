import React, { useState, useEffect } from "react";
import VideoPlayer1 from "../Components/Videoplayers/VideoPlayer1";
import VideoPlayer2 from "../Components/Videoplayers/VideoPlayer2";

/**
 * Multiplayer Component - Represents the multiplayer mode of the Mathminds Online application.
 * @component
 * @returns {JSX.Element} Multiplayer component
 */
const Multiplayer = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [showPendingScreen, setPendingScreen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);
  const [playerCount, setPlayerCount] = useState(0);

    /**
   * useEffect to handle window resize and update isMobileView state.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    /**
   * Event handler for starting the multiplayer game.
   * @function
   * @returns {void}
   */
  const handleStartClick = () => {
    setGameStarted(true);
    setPendingScreen(true);
    setPlayerCount(1); // The first player has joined
  };

    /**
   * Event handler for quitting the multiplayer game.
   * @function
   * @returns {void}
   */
  const handleQuitClick = () => {
    setPendingScreen(false);
    setPlayerCount(0); // Reset player count when quitting
  };

  return (
    <div align="center">
      {showPendingScreen && (
        <>
        <h2>{playerCount === 1 ? "Waiting for players..." : "Match is ready!" }</h2>
        <div style={{ display: "flex" }}>
          {playerCount === 1 && <VideoPlayer1 />}
          {playerCount === 2 && <VideoPlayer2 />}
          {isMobileView && playerCount === 2 && <VideoPlayer1 />}
        </div>
        </>
      )}

      {!showPendingScreen && (
        <>
        <h2 className="loggedInPageTitle">Multiplayer Mode</h2>
        <div style={{ marginTop: "1.5em", textAlign: "left", width: "75%" }}>
          <p className="modeDesc">
            Ok, so you wanna pitch yourself against someone? Good luck,
            you'll never know who you'll compete with.
          </p>
          <br />
          <p className="modeDesc">
            Or maybe you do. Since this site is small, you can expect to pitch
            yourself against someone you know.
          </p>
          <br />
          <p className="modeDesc">
            In this mode, you're expected to answer 10 math questions faster
            than your opponent. If you do so, you win, and wins are added to
            your profile! However, your competitor will end up losing and keep
            these losses on their record forever.
          </p>
          <br />
          <p className="modeDesc">Ready to compete?</p>
        </div>
        <button className="btn multiplayer" onClick={handleStartClick}>
          Absolutely!
        </button>
      </>
      )}

      {showPendingScreen && (
        <>
          <button className="btn" onClick={handleQuitClick}>
            Quit Match
          </button>
          <button disabled={true} className="btn">
            Start game
          </button>
          {isMobileView && playerCount === 2 && <VideoPlayer2 />}
        </>
      )}
    </div>
  );
};

export default Multiplayer;
