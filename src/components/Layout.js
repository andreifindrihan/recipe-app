import React from "react";
import { Route } from "react-router-dom";

const Layout = ({ component: Component, data, setName, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => <Component {...matchProps} data={data} setName={setName} />} />
  );
};

export default Layout;


