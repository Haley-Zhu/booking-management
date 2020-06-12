import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/User/Login';
import Signup from '../pages/User/Signup';
import Order from '../pages/Order/Order';

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