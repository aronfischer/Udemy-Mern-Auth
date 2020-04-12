import React from "react";
import Navigation from "./Navigation";
import SignUpLogin from "../components/auth/SignUp_Login";

import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { defaultSettings } from "../data/notification";
import "animate.css";

const Layout = () => {
  const createNotification = (notification, next) => {
    store.createNotification({
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
      <Navigation />
      <ReactNotification />
      <SignUpLogin />
    </>
  );
};

export default Layout;
