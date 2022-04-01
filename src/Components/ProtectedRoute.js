import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../helpers/Cookies/LocalStorage";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = getCurrentUser();
  const auth = isAuthenticated?true:false
  return (

    <Route
      {...restOfProps}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;