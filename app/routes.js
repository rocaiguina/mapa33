import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import AppContainer from './containers/AppContainer';
import IntroContainer from './containers/IntroContainer';
import HomeContainer from './containers/HomeContainer';
import RegisterLandContainer from './containers/RegisterLandContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/map" component={AppContainer}/>
      <Route path="/home" component={HomeContainer} />
      <Route path="/register-land" component={RegisterLandContainer} />
      <Route path="/" component={IntroContainer} />
    </Switch>
  </Router>
);
