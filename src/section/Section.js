import React from "react";
import { Route, Redirect } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";
import { getCurrentUser } from "../helpers/Cookies/LocalStorage";
import Device from "../pages/Devices";
import SignIn from "../pages/SignIn";

export default function Section() {
  const isAuthenticated = getCurrentUser();
  const auth = isAuthenticated ? true : false;

  return (
    <>
      {auth ? <Redirect to="/device" /> : <Redirect to="/" />}
      <Route exact path="/" component={SignIn} />
      <ProtectedRoute exact path="/device" component={Device} />
    </>
  );
}
