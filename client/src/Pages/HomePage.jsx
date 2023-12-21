import React from "react";
import "../Styles/HomePage.css";
import AboutUs from "../Pages/AboutUs";
import { Route, Routes, BrowserRouter as Router, Link, Navigate } from "react-router-dom";
import { FiInfo, FiList } from "react-icons/fi";

/**
 * HomePage Component - Represents the home page of the Mathminds Online application.
 * @component
 * @returns {JSX.Element} HomePage component
 */
const HomePage = () => {
  return (
    <div>
      <div className="homePage-section1">
        <h1 className="homePageTitle">Welcome to Mathminds Online</h1>
        <p className="homePageText"><i>Your ultimate destination for fast-paced math competitions.</i></p><br/>
        <>
          <Link to="/register" className="btn"> Register </Link>
          <Link to="/login" className="btn"> Login </Link>
        </>
      </div>
      <div className="homePage-section2">
        <h2 className="homePageTitle"><FiInfo /> About Mathminds Online</h2>
        <AboutUs/>
      </div>
      <div className="homePage-section3">
        <h2 className="homePageTitle"><FiList /> Key Features</h2>
        <ul className="homePageSectionDesc">
          <li><b style={{textTransform:'uppercase'}}>Game Modes:</b> Mathmind Online offers both single-player and two-player modes. The two-player mode leverages WebRTC technology for real-time competition.</li>
          <li><b style={{textTransform:'uppercase'}}>User-Friendly:</b> Quitting during a match is possible but counts as a loss, with a confirmation prompt for your convenience.</li>
          <li><b style={{textTransform:'uppercase'}}>Themes:</b> Switch between light and dark themes to suit your preference.</li>
          <li><b style={{textTransform:'uppercase'}}>User Profiles:</b> Visit user profiles, view/edit bios, and keep track of your wins and losses.</li>
          <li><b style={{textTransform:'uppercase'}}>Victory and Loss Screens:</b> Celebrate your wins and learn from your losses with dedicated screens to mark your progress.</li>
          <li><b style={{textTransform:'uppercase'}}>Leaderboard:</b> Compete for the top spot on the leaderboard, where users are ranked by the number of wins.</li>
          <li><b style={{textTransform:'uppercase'}}>Challenging Gameplay:</b> If you answer correctly, you'll advance to the next question. If not, you'll be stuck until you get it right.</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
