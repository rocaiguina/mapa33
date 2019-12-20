import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import IntroContainer from './containers/IntroContainer';
import MapContainer from './containers/MapContainer';
import RegisterSuccessContainer from './containers/RegisterSuccessContainer';
import RegisterWizardContainer from './containers/RegisterWizardContainer';
import LandDetailContainer from './containers/LandDetailContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/map" component={MapContainer} />
      <Route path="/register/success" component={RegisterSuccessContainer} />
      <Route path="/register" component={RegisterWizardContainer} />
      <Route path="/land/:id" component={LandDetailContainer} />
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
