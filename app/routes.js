import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import AppContainer from './containers/AppContainer';
import IntroContainer from './containers/IntroContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/intro" component={IntroContainer}/>
      <Route path="/" component={AppContainer} />
    </Switch>
  </Router>
);
