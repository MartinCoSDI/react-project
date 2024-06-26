import { useRef } from "react";
import "./Header.css";
import { useStateValue } from "../StateProvider";
import { auth } from "../config/Firebase";
import { Link } from "react-router-dom";

function Header() {
  const navRef = useRef();
  const [{ basket, user }, dispatch] = useStateValue();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
    showNavbar();
  };
  return (
    <div className="navbar">
      <header>
        <Link to="/react-project">
          <img
            className="header_logo"
            src="https://www.logolynx.com/images/logolynx/0f/0f7cb486472899b42555a4acbdf7dab4.jpeg"
            alt="header_logo"
          />
        </Link>

        <nav ref={navRef}>
          <Link onClick={showNavbar} to="/react-project" className="nav-element">
            <p>Home</p>
          </Link>
          {user ? (
            <Link onClick={showNavbar} to="/dashboard" className="nav-element">
              <p>Dashboard</p>
            </Link>
          ) : null}

          {user ? (
            <Link onClick={showNavbar} to="/today" className="nav-element">
              <p>Today</p>
            </Link>
          ) : null}

          {user ? (
            <Link onClick={showNavbar} to="/thisweek" className="nav-element">
              <p>This Week</p>
            </Link>
          ) : null}

          {user ? (
            <Link onClick={showNavbar} to="/thismonth" className="nav-element">
              <p>This Month</p>
            </Link>
          ) : null}

          {user ? (
            <Link onClick={showNavbar} to="/thisyear" className="nav-element">
              <p>This Year</p>
            </Link>
          ) : null}
          
          {user ? (
            <Link onClick={showNavbar} to="/profile" className="nav-element">
              <p>Profile</p>
            </Link>
          ) : null}
          <Link to={!user && "/login"} className="nav-element">
            <div onClick={handleAuthenticaton} className="signin_but">
              <p>{user ? "Sign Out" : "Sign In"}</p>
            </div>
          </Link>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
           
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          
        </button>
      </header>
    </div>
  );
}

export default Header;
