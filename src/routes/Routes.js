import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/User/Login';
import AccountSetting from '../pages/User/AccountSetting';
import PasswordSetting from '../pages/User/PasswordSetting';
import Signup from '../pages/User/Signup';
import Order from '../pages/Order/Order';
import GlobalLayout from '../components/GlobalLayout';

const Routes = () => {
  return (
    <Switch>
      <GlobalLayout>
      <Route exact path='/login' component={Login} />
      <Route exact path='/account/setting/base' component={AccountSetting} />
      <Route exact path='/account/setting/security' component={PasswordSetting} />
      </GlobalLayout>
      {/* <Route exact path='/login' component={Login} /> */}
      <Route exact path='/signup' component={Signup} />
      <Route path='/orders' component={Order} />
    </Switch>
  );
}

export default Routes;