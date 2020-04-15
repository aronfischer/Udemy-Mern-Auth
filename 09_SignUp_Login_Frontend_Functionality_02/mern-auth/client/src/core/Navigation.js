import React from "react";
import { Link, withRouter } from "react-router-dom";

import "../styles/navigation.css";

const Navigation = ({ history, match, ...props }) => {
  const { displayAuth } = props;

  const isActive = (urlPath) => {
    if (match.path === urlPath) {
      return { color: "rgba(255,255,255, 0.3)" };
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark af-navbar'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          My Brand
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav w-100'>
            <li className='nav-item mr-auto'>
              <Link to='/' className='nav-link' style={isActive("/")}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <button className='nav-link' onClick={() => displayAuth("login")}>
                Login
              </button>
            </li>

            <li className='nav-item'>
              <button
                className='nav-link'
                onClick={() => displayAuth("signUp")}
              >
                Sign up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
