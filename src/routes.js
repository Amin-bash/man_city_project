import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/signin';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/PrivateRoutes';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes {...props} exact component={Dashboard} path="/dashboard" />
        <Route exact component={SignIn} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  )
}
export default Routes;
