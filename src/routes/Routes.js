import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/admin/Login';
import Signup from '../pages/admin/Signup';
import Order from '../pages/order/Order';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route path='/orders' component={Order} />
    </Switch>
  );
}

export default Routes;