import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/admins/Login';
import Order from '../pages/orders/Order';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/orders' component={Order} />
    </Switch>
  );
}

export default Routes;