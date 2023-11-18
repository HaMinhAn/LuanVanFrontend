import React from "react";
import { Switch, Route } from "react-router-dom";
import { CustomRoutes } from "../types/CustomRoute";
import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/Home";
import Cart from "../components/Cart";
import CartPage from "../pages/Cart";
import AdminRoute from "./admin/AdminRoute";
import InforPhonePage from "../pages/InforPhone";
import TestComponent from "../pages/test";
import {
  InternalServerPage,
  NotFoundPage,
  UnauthoritePage,
} from "../components/Error";
import Checkout from "../components/Checkout";
import PayPage from "../pages/Pay/PayPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import Paid from "../pages/Paid";
import OrderManagePage from "../pages/OrderManagePage";
import OrderDetailPage from "../pages/OrderDetailPage";
// const adminRoutes: CustomRoutes[] = [
//   { path: "/login", exact: true, component: Login },
//   { path: "/", exact: true, component: HomePage },
//   { path: "/cart", exact: true, component: CartPage },
// ];
const routes: CustomRoutes[] = [
  { path: "/login", exact: true, component: Login, key: "login" },
  { path: "/", exact: true, component: HomePage, key: "HomePage" },
  { path: "/cart", exact: true, component: CartPage, key: "CartPage" },
  {
    path: "/error/404",
    exact: true,
    component: NotFoundPage,
    key: "NotFoundPage",
  },
  {
    path: "/error/401",
    exact: true,
    component: UnauthoritePage,
    key: "UnauthoritePage",
  },
  {
    path: "/error/500",
    exact: true,
    component: InternalServerPage,
    key: "InternalServerPage",
  },
  {
    path: "/test",
    exact: true,
    component: TestComponent,
    key: "TestComponent",
  },
  {
    path: "/checkout",
    exact: true,
    component: CheckoutPage,
    key: "CheckoutPage",
  },
  { path: "/order", exact: true, component: PayPage, key: "PayPage" },
  {
    path: "/order/detail",
    exact: true,
    component: OrderDetailPage,
    key: "OrderDetailPage",
  },
  { path: "/paid", exact: true, component: Paid, key: "Paid" },
];
const ErrorPage: CustomRoutes[] = [
  {
    path: "error/404",
    exact: true,
    component: NotFoundPage,
    key: "NotFoundPage",
  },
  {
    path: "error/401",
    exact: true,
    component: UnauthoritePage,
    key: "UnauthoritePage",
  },
  {
    path: "error/500",
    exact: true,
    component: InternalServerPage,
    key: "InternalServerPage",
  },
];
const RouteManage = () => {
  return (
    <Switch>
      <Route
        path="/admin/book"
        exact
        component={AdminRoute}
        key={"admin-book"}
      />
      <Route
        path="/admin/order"
        exact
        component={OrderManagePage}
        key={"admin-order"}
      />
      <Route path="/infor/:id" exact component={InforPhonePage} key={"infor"} />
      {/* <Route path="/test" exact component={TestComponent} /> */}
      {/* {ErrorPage.map((route, key) => {
        return (
          <Route
            key={key}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })} */}
      {routes.map((route, key) => {
        return (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
};

export default RouteManage;
