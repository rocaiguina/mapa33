import React from 'react';
import About from './about';
import Contact from './contact';
import Frequent from './frequentquestions';
import { withRouter } from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';
class Info extends React.Component {
  constructor(props) {
     super(props);
  }
  render () {
    const { match } = this.props;
    return (    
    <Switch>
        <Route  exact path={`/info`} >          
           <About />
        </Route>
        <Route path={`/info/contact`}>          
           <Contact />
        </Route>
        <Route path={`/info/frequentquestions`}>          
           <Frequent />
        </Route>
    </Switch>
    );
  }
}

export default Info;