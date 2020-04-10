import React from "react";

import "../styles/navigation.css";

const Navigation = ({ history, match }) => {
  console.log("history", history);
  console.log("match", match);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark af-navbar'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          My Brand
        </a>

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
              <a href='/' className='nav-link'>
                Home
              </a>
            </li>

            <li className='nav-item'>
              <button className='nav-link'>Login</button>
            </li>

            <li className='nav-item'>
              <button className='nav-link'>Sign up</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
