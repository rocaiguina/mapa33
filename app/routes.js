import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';

export default () => (
  <Router>
    <Switch>
      <Route path="/home" component={HomeContainer}/>
      <Route path="/" component={AppContainer} />
    </Switch>
  </Router>
);
