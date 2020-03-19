import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import './style/App.css';

import IntroContainer from './containers/IntroContainer';
import InfoContainer from './containers/InfoContainer';
import LandMapViewContainer from './containers/LandMapViewContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import RegisterWizardContainer from './containers/RegisterWizardContainer';
import LandDetailContainer from './containers/LandDetailContainer';
import LandListViewContainer from './containers/LandListViewContainer';
import RegisterUser from './containers/user/RegisterUser';
import ProfileUser from './containers/user/ProfileUser';
import ProfileUserEdit from './containers/user/ProfileUserEdit';
import RegisterUserSuccessful from './containers/user/RegisterUserSuccessful';
import Login from './containers/auth/Login';
import ResetPassword from './containers/auth/ResetPassword';
import RecoveryPassword from './containers/auth/RecoveryPassword';
import SuccesRecoveryPassword from './containers/auth/SuccesRecoveryPassword';

export default () => (
  <Router>
    <Switch>
      <Route exact={true} path="/login" component={Login}/>
      <Route exact={true} path="/login/forgot-password" component={RecoveryPassword}/>
      <Route exact={true} path="/login/success-recovery" component={SuccesRecoveryPassword}/>
      <Route exact={true} path="/login/reset-password" component={ResetPassword}/>
      <Route exact={true} path="/login" component={Login}/>
      <Route exact={true} path="/map" component={LandMapViewContainer} />
      <Route exact={true} path="/map/list" component={LandListViewContainer} />
      <Route exact={true} path="/register/success" component={RegisterSuccessContainer} />
      <Route exact={true} path="/register" component={RegisterWizardContainer} />
      <Route exact={true} path="/land/:landId" component={LandDetailContainer} />
      <Route exact={true} path="/register/user" component={RegisterUser}/>
      <Route exact={true} path="/register/user/successful" component={RegisterUserSuccessful}/>
      <Route exact={true} path="/profile" component={ProfileUser}/>
      <Route exact={true} path="/profile/edit" component={ProfileUserEdit}/>
      <Route exact={true} path="/info" component={InfoContainer} />      
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
