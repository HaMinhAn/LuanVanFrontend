import React from "react";
import { Switch, Route } from "react-router-dom";
import { CustomRoutes } from "../types/CustomRoute";
import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/Home";
const routes: CustomRoutes[] = [
  { path: "/login", exact: true, component: Login },
  { path: "/", exact: true, component: HomePage },
];

const RouteMangane = () => {
  return (
    <Switch>
      {routes.map((route, key) => {
        return (
          <Route
            key={key}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
};

export default RouteMangane;
