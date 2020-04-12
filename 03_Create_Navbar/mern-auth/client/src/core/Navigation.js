import React from "react";

import "../styles/navigation.css";

const Navigation = () => {
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
              <Link to='/' className='nav-link'>
                Home
              </Link>
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
