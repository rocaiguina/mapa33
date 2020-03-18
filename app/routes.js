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
import RegisterUserSuccessful from './containers/user/RegisterUserSuccessful';
import Login from './containers/auth/Login';

export default () => (
  <Router>
    <Switch>
      <Route exact={true} path="/login" component={Login}/>
      <Route exact={true} path="/map" component={LandMapViewContainer} />
      <Route exact={true} path="/map/list" component={LandListViewContainer} />
      <Route exact={true} path="/register/success" component={RegisterSuccessContainer} />
      <Route exact={true} path="/register" component={RegisterWizardContainer} />
      <Route exact={true} path="/land/:landId" component={LandDetailContainer} />
      <Route exact={true} path="/register/user" component={RegisterUser}/>
      <Route exact={true} path="/register/user/successful" component={RegisterUserSuccessful}/>
      <Route exact={true} path="/info" component={InfoContainer} />
      <Route exact={true} path="/profile" component={ProfileUser} />
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
