import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import IntroContainer from './containers/IntroContainer';
import MapContainer from './containers/MapContainer';
import RegisterContainer from './containers/RegisterContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/map" component={MapContainer} />
      <Route path="/register" component={RegisterContainer} />
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
