import React from "react";
import { Link } from "react-router-dom";
import "../Styles/GameAreas.css";

/**
 * ModeSelection Component - Allows the user to choose between single-player and multiplayer modes.
 * @component
 * @param {Object} props - Component properties
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in
 * @returns {JSX.Element} ModeSelection component
 */
const ModeSelection = ({ isLoggedIn }) => {
  return (
        <>
        <h2 className="gameAreaTitle">Choose Your Mode</h2>
            <div className="mode-buttons">
                <Link to="/singleplayer" className="btn singleplayer">Single Player</Link>
                <Link to="/multiplayer" className="btn multiplayer">Multiplayer</Link>
            </div>
        </>
  );
};

export default ModeSelection;
