import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "../../styles/authForm.css";

const SignUpLogin = (props) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [styles, setStyles] = useState({
    login: { left: "50px" },
    signUp: { left: "400px" },
    btn: { left: "0" },
  });

  const { username, email, password } = values;
  const { start, isDismissible, displayAuth, createNotification } = props;

  useEffect(() => {
    if (start === "login") {
      changeToLogin();
    } else if (start === "signUp") {
      changeToSignUp();
    }

    // Add Event Listeners
    if (isDismissible) {
      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }
  }, []);

  const node = useRef();

  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target) || !isDismissible) {
      // Inside click
      return;
    } else {
      // Outside click
      displayAuth(null);
    }
  };

  const changeToSignUp = () => {
    setStyles({
      login: { left: "-400px" },
      signUp: { left: "50px" },
      btn: { left: "110px" },
    });
  };

  const changeToLogin = () => {
    setStyles({
      login: { left: "50px" },
      signUp: { left: "400px" },
      btn: { left: "0" },
    });
  };

  const handleChange = (name) => (event) => {
    if (name === "username") {
      setValues({ ...values, username: event.target.value });
    } else if (name === "email") {
      setValues({ ...values, email: event.target.value });
    } else if (name === "password") {
      setValues({ ...values, password: event.target.value });
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/sign-up`, {
        username,
        email,
        password,
      })
      .then((response) => {
        // Create notification
        createNotification({
          type: "success",
          title: "Sign up success",
          message: `An email has been sent to ${email}. Please verify your email address.`,
        });

        setValues({ username: "", email: "", password: "" });
      })
      .catch((error) => {
        // Create notification
        createNotification({
          type: "danger",
          title: "Sign up error",
          message: "Something went wrong please try again.",
        });
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        // Create notification
        createNotification({
          type: "success",
          title: "Login success",
          message: "You logged in successfully",
        });

        setValues({ username: "", email: "", password: "" });
      })
      .catch((error) => {
        // Create notification
        createNotification({
          type: "danger",
          title: "Login error",
          message: "Something went wrong please try again.",
        });
      });
  };

  return (
    <div>
      <SignUpLoginForm
        values={values}
        styles={styles}
        handleChange={handleChange}
        changeToLogin={changeToLogin}
        changeToSignUp={changeToSignUp}
        node={node}
        handleSignUpSubmit={handleSignUpSubmit}
        handleLoginSubmit={handleLoginSubmit}
      />
    </div>
  );
};

const SignUpLoginForm = (props) => {
  const { username, email, password } = props.values;
  const { login, signUp, btn } = props.styles;
  const {
    handleChange,
    changeToLogin,
    changeToSignUp,
    node,
    handleLoginSubmit,
    handleSignUpSubmit,
  } = props;

  return (
    <>
      <div className='af-form-wrapper'>
        <div className='af-form-box' ref={node}>
          <div className='af-button-box'>
            <div id='af-btn' style={btn}></div>
            <button
              type='button'
              className='af-toggle-btn'
              onClick={changeToLogin}
            >
              Login
            </button>
            <button
              type='button'
              className='af-toggle-btn'
              onClick={changeToSignUp}
            >
              Sign up
            </button>
          </div>

          <form id='af-login-form' className='af-input-group' style={login}>
            <div className='af-input-wrapper'>
              <input
                type='email'
                className='af-input-field'
                value={email}
                onChange={handleChange("email")}
              />
              <label>Email</label>
            </div>
            <div className='af-input-wrapper'>
              <input
                type='password'
                className='af-input-field'
                value={password}
                onChange={handleChange("password")}
              />
              <label>Password</label>
            </div>
            <button
              type='submit'
              className='af-submit-btn'
              onClick={handleLoginSubmit}
            >
              Login
            </button>
            <button type='button' className='af-forgot-password-btn'>
              Forgot your Password?
            </button>
          </form>

          <form id='af-sign-up-form' className='af-input-group' style={signUp}>
            <div className='af-input-wrapper'>
              <input
                type='text'
                className='af-input-field'
                value={username}
                onChange={handleChange("username")}
              />
              <label>Username</label>
            </div>
            <div className='af-input-wrapper'>
              <input
                type='email'
                className='af-input-field'
                value={email}
                onChange={handleChange("email")}
              />
              <label>Email</label>
            </div>
            <div className='af-input-wrapper'>
              <input
                type='password'
                className='af-input-field'
                value={password}
                onChange={handleChange("password")}
              />
              <label>Password</label>
            </div>
            <button
              type='submit'
              className='af-submit-btn'
              onClick={handleSignUpSubmit}
            >
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
