import React, { useEffect, useState, useRef, useContext } from "react";
import "../styles/NavBar.css";
import cdLogo from "/images/CD_Logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Warning from "./Warning.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

function NavBar() {
  const [handleLogout, setHandleLogout] = useState(false);
  const [islogout, setIsLogout] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (islogout) {
      logout()
      setHandleLogout(false)
      setIsLogout(false)
    }
  }, [islogout])

  //Handle blur
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img src={cdLogo} alt="Career desire logo" className="logo-img" />
      </Link>
      <div className="nav-options">
        <div className="btn-container">
          {!user && <Link to="/login"><button className="auth-btn">Login</button></Link>}
          {user && (
            <div ref={profileRef} className="profile-container" id={isProfileOpen ? "profile-open" : "profile-close"}>
              <div className="profile-icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="profile-options">
                <Link to="/"><p>Dashboard</p></Link>
                <div className="logout-container" onClick={() => setHandleLogout(true)}>
                  <p>Logout</p>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {handleLogout && (
        <Warning
          warnText="Are you sure you want to log out?"
          actionTextOne="Yes"
          cancelText="No"
          actionOne={() => setIsLogout(true)}
          noAction={() => setHandleLogout(false)}
        />
      )}
    </nav>
  );
}

export default NavBar;
