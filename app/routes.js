import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import AppContainer from './containers/AppContainer';

export default () => (
  <Router>
    <AppContainer>
      <Route path="/" component={AppContainer} />
    </AppContainer>
  </Router>
);
