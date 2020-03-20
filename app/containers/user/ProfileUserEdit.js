import React from 'react';
import { notification } from 'antd';
import PropTypes from 'prop-types';
import BaseLayout from '../../components/layout/base';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { Col, Input, Row, DatePicker, Select, Checkbox } from 'antd';
import ProfileEdit from '../../components/user/profileEdit';

class ProfileUser extends React.Component {
  handleOnClose = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <BaseLayout
        dark
        title="MI PERFÍL"
        footerRightComponent={
          <Button
            className="m33-btn ant-btn-xlg"
            size="large"
            type="secondary"
            bordered
          >
            <Icon type="plus" />
          </Button>
        }
      >
        <ProfileEdit />
      </BaseLayout>
    );
  }
}

ProfileUser.propTypes = {
  history: PropTypes.object,
};

export default ProfileUser;
