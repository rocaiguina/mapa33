import React from 'react';
import Register from './register';
import Login from './login';
import Profile from './profile';
import { withRouter } from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
     super(props);
  }
  render () {
    const { match } = this.props;
    return (    
    <Switch>
        <Route exact path={`/user/register`} >          
           <Register/>
        </Route>        
        <Route exact path={`/user/login`} >          
           <Login/>
        </Route>        
        <Route exact path={`/user/profile`} >          
           <Profile/>
        </Route>        
    </Switch>
    );
  }
}

export default User;