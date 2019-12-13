import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import IntroContainer from './containers/IntroContainer';
import MapContainer from './containers/MapContainer';
import RegisterContainer from './containers/RegisterContainer';
import WizardContainer from './containers/WizardContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/map" component={MapContainer} />
      <Route path="/register" exact={false} component={WizardContainer} />
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
