import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/User/Login";
import AccountSetting from "../pages/User/AccountSetting";
import PasswordSetting from "../pages/User/PasswordSetting";
import Signup from "../pages/User/Signup";
import Order from "../pages/Order/Order";
import Customer from "../pages/Customer";
import Business from "../pages/Business";
import Category from "../pages/Category";
import GlobalLayout from "../components/GlobalLayout";

const Routes = () => {
  return (
    <Switch>
      <GlobalLayout>
        <Redirect from='/' to="/customers" />
        <Route exact path="/customers" component={Customer} />
        <Route exact path="/businesses" component={Business} />
        <Route exact path="/Categories" component={Category} />
        <Route exact path="/orders" component={Order} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/account/setting/base" component={AccountSetting} />
        <Route
          exact
          path="/account/setting/security"
          component={PasswordSetting}
        />
        <Route exact path="/signup" component={Signup} />
      </GlobalLayout>
    </Switch>
  );
};

export default Routes;
