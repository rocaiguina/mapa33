import React from 'react';
import BaseLayout from '../layout/base';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Col, Input, Row, DatePicker, Select, Checkbox} from 'antd';

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }
  
  backPage = (event) => {
    window.history.back();
  } 
    
  render () {
      
    
    return (
        <BaseLayout dark          
        >
        <h3>prueba entera oscura</h3>
        </BaseLayout>
    );                                                                                                                                                                                                                      
  }
}

export default Profile;
