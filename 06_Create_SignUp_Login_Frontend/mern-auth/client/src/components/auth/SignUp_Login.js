import React from "react";

import "../../styles/authForm.css";

const SignUpLogin = () => {
  return (
    <div>
      <SignUpLoginForm />
    </div>
  );
};

const SignUpLoginForm = () => {
  return (
    <>
      <div className='af-form-wrapper'>
        <div className='af-form-box'>
          <div className='af-button-box'>
            <div id='af-btn'></div>
            <button type='button' className='af-toggle-btn'>
              Login
            </button>
            <button type='button' className='af-toggle-btn'>
              Sign up
            </button>
          </div>

          <form id='af-login-form' className='af-input-group'>
            <div className='af-input-wrapper'>
              <input type='email' className='af-input-field' />
              <label>Email</label>
            </div>
            <div className='af-input-wrapper'>
              <input type='password' className='af-input-field' />
              <label>Password</label>
            </div>
            <button type='submit' className='af-submit-btn'>
              Login
            </button>
            <button type='button' className='af-forgot-password-btn'>
              Forgot your Password?
            </button>
          </form>

          <form id='af-sign-up-form' className='af-input-group'>
            <div className='af-input-wrapper'>
              <input type='text' className='af-input-field' />
              <label>Name</label>
            </div>
            <div className='af-input-wrapper'>
              <input type='email' className='af-input-field' />
              <label>Email</label>
            </div>
            <div className='af-input-wrapper'>
              <input type='password' className='af-input-field' />
              <label>Password</label>
            </div>
            <button type='submit' className='af-submit-btn'>
              Sign up
            </button>
            <button type='button' className='af-forgot-password-btn'>
              Forgot your Password?
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpLogin;
