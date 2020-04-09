import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.css';

import IntroContainer from './containers/IntroContainer';
import ContactContainer from './containers/info/ContactInfo';
import FrequentQuestionsContainer from './containers/info/FQAsInfo';
import AboutUsContainer from './containers/info/AboutUsInfo';
import LandMapViewContainer from './containers/LandMapViewContainer';
import RegisterLandSuccessful from './containers/land/RegisterLandSuccessful';
import RegisterLand from './containers/land/RegisterLand';
import LandDetailContainer from './containers/LandDetailContainer';
import LandListViewContainer from './containers/LandListViewContainer';
import RegisterUser from './containers/user/RegisterUser';
import ProfileUser from './containers/user/ProfileUser';
import ProfileUserEdit from './containers/user/ProfileUserEdit';
import RegisterUserSuccessful from './containers/user/RegisterUserSuccessful';
import Login from './containers/auth/Login';
import ForgotPassword from './containers/auth/ForgotPassword';
import ForgotPasswordSuccessful from './containers/auth/ForgotPasswordSuccessful';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordSuccessful from './containers/auth/ResetPasswordSuccessful';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route
          exact={true}
          path="/forgot-password"
          component={ForgotPassword}
        />
        <Route
          exact={true}
          path="/forgot-password/successful"
          component={ForgotPasswordSuccessful}
        />
        <Route
          exact={true}
          path="/reset-password/successful"
          component={ResetPasswordSuccessful}
        />
        <Route
          exact={true}
          path="/reset-password/:token"
          component={ResetPassword}
        />

        <Route exact={true} path="/register/user" component={RegisterUser} />
        <Route
          exact={true}
          path="/register/user/successful"
          component={RegisterUserSuccessful}
        />
        <Route exact={true} path="/profile" component={ProfileUser} />
        <Route exact={true} path="/profile/edit" component={ProfileUserEdit} />

        <Route exact={true} path="/map" component={LandMapViewContainer} />
        <Route
          exact={true}
          path="/map/list"
          component={LandListViewContainer}
        />
        <Route
          exact={true}
          path="/register/success"
          component={RegisterLandSuccessful}
        />
        <Route
          path="/register"
          component={RegisterLand}
        />
        <Route
          exact={true}
          path="/land/:landId"
          component={LandDetailContainer}
        />
        <Route 
          exact={true}
          path="/contact" 
          component={ContactContainer}
        />
        <Route 
          exact={true}
          path="/frequentquestions" 
          component={FrequentQuestionsContainer}
        />
        <Route 
          exact={true}
          path="/aboutus" 
          component={AboutUsContainer}
        />
        <Route path="/" component={IntroContainer} />
      </Switch>
    </Router>
  );
}

export default Routes;
