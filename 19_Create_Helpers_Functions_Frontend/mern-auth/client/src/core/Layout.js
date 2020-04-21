import React, { useState } from "react";
import Navigation from "./Navigation";
import SignUpLogin from "../components/auth/SignUp_Login";

import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { defaultSettings } from "../data/notification";
import "animate.css";

const Layout = () => {
  const [isShowingAuth, setIsShowingAuth] = useState(null);
  const [isDismissible, setIsDismissible] = useState(true);

  const displayAuth = (form) => {
    setIsShowingAuth(form);
  };

  const createNotification = (notification, next) => {
    store.addNotification({
      ...defaultSettings,
      type: notification.type,
      title: notification.title,
      message: notification.message,
    });

    if (next) {
      next();
    }
  };

  return (
    <>
      <Navigation displayAuth={displayAuth} />
      <ReactNotification />
      {isShowingAuth === "login" ? (
        <SignUpLogin
          start='login'
          isDismissible={isDismissible}
          displayAuth={displayAuth}
          createNotification={createNotification}
        />
      ) : null}
      {isShowingAuth === "signUp" ? (
        <SignUpLogin
          start='signUp'
          isDismissible={isDismissible}
          displayAuth={displayAuth}
          createNotification={createNotification}
        />
      ) : null}
    </>
  );
};

export default Layout;
