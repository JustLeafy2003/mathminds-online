import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiLogOut, FiSun, FiMoon, FiUser } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../ThemeProvider"; // Import the useTheme hook

/**
 * Navigation component for the application.
 * @component
 */
const Navigation = ({ isLoggedIn, isNavCollapsed, handleLogout, setIsNavCollapsed }) => {
  const { darkTheme, toggleTheme } = useTheme(); // Use the custom hook to access the theme properties
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${darkTheme ? "navbar-dark" : "navbar-light"}`} style={{ backgroundColor: "#098765" }}>
        <div className="container">
            {/* Navbar for Vertical Devices */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>
              <FiMenu size={24} />
            </button>
            <Link to="/" id="logo" className="navbar-brand d-lg-none text-light">Mathminds Online</Link>
            {/* Navbar for Horizontal Devices */}
            <Link to="/" id="logo" className="navbar-brand d-none d-lg-block text-light">Mathminds Online</Link>
            <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
              <ul className={`navbar-nav ${isMobileView ? 'ms-auto' : 'me-auto'}`} style={{ marginLeft: isMobileView ? '0' : '2em' }}>
                {isLoggedIn ? (
                  <>
                    <Link to="/aboutus" className="nav-btn"> About Us </Link>
                    <Link to="/leaderboard" className="nav-btn"> Leaderboard </Link>
                    <Link to="/singleplayer" className="nav-btn"> Practice </Link>
                    <Link to="/multiplayer" className="nav-btn"> 1v1 </Link>
                    {/* <Link to="/questions" className="nav-btn"> [remove this] </Link> */}
                    {/* <Link to="/videochat" className="nav-btn"> VideoChat </Link> */}
                    {isMobileView ? (<hr style={{width:'100%'}}></hr>) : ''}
                  </>
                ) : (
                  <>
                  </>
                )}
              </ul>
              <ul className={`navbar-nav`} style={{ marginLeft: isMobileView ? '0' : '1.5em' }}>
                {isLoggedIn ? (
                  <>
                  <Link to="/profile" className={`nav-btn`}>
                  <FiUser size={24} className="dropdown-item-icon" /> Profile
                </Link>
                  <button onClick={toggleTheme} className="nav-btn theme-toggle-button">
                    {darkTheme ? <FiSun size={24} /> : <FiMoon size={24} /> }{" "}{isMobileView ? "Toggle Theme" : ""}
                  </button>
                  <Link to="/" onClick={handleLogout} className={`nav-btn ${isMobileView ? '' : 'me-2'}`}>
                    <FiLogOut size={24} className="dropdown-item-icon" /> Logout
                  </Link>
                  </>
                ) : (
                  <>
                  <button onClick={toggleTheme} className="nav-btn theme-toggle-button">
                    {darkTheme ? <FiSun size={24} /> : <FiMoon size={24} /> }{" "}{isMobileView ? "Toggle Theme" : ""}
                  </button>
                    <Link to="/register" className="nav-btn"> Register </Link>
                    <Link to="/login" className="nav-btn"> Login </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        </>
    )
}

export default Navigation;
