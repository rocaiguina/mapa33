import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import IntroContainer from './containers/IntroContainer';
import LandMapViewContainer from './containers/LandMapViewContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import RegisterWizardContainer from './containers/RegisterWizardContainer';
import LandDetailContainer from './containers/LandDetailContainer';
import LandListViewContainer from './containers/landListViewContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/map" exact={true} component={LandMapViewContainer} />
      <Route path="/map/list" component={LandListViewContainer} />
      <Route path="/register/success" component={RegisterSuccessContainer} />
      <Route path="/register" component={RegisterWizardContainer} />
      <Route path="/land/:id" component={LandDetailContainer} />
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
