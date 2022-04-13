import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const { confirm } = Modal;

class SocialShareModal extends React.Component {
  render() {
    const { visible, onClose, link } = this.props;

    return (
      <Modal
        visible={visible}
        width={380}
        footer={null}
        onCancel={onClose}
        destroyOnClose={true}
        wrapClassName="ant-modal-style2"
      >
        <h3 className="m-b-15 text-bold">
          COMPARTE ESTA PROPUESTA CON TUS CONTACTOS
        </h3>
        <div className="text-center">
          <a
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width="80" src="/images/social/icon-facebook.png" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width="80" src="/images/social/icon-twitter.png" />
          </a>
          <a
            href={`whatsapp://send?text=${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width="80" src="/images/social/icon-whatsapp.png" />
          </a>
          <a
            href={`mailto:?subject=I wanted you to see this site&amp;body=Check out this site ${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img width="80" src="/images/social/icon-email.png" />
          </a>
        </div>
      </Modal>
    );
  }
}

SocialShareModal.defaultValues = {
  visible: false,
  onClose: () => {},
};

SocialShareModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SocialShareModal;
