import React from 'react';
import Register from './register';
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
    </Switch>
    );
  }
}

export default User;