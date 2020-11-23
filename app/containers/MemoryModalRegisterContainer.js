import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import MemoryForm from '../components/memory/MemoryForm';
import MemoryPreview from '../components/memory/MemoryPreview';
import MemorySuccessfulView from '../components/memory/MemorySuccessfulView';

import LandAPI from '../api/land';

class MemoryModalRegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      mediaType: undefined,
      embedURL: '',
      multimedia: [],
      step: 'form', // form, preview, done
    };
  }

  handleOnContinue = values => {
    const { title, description, mediaType, embedURL, multimedia } = values;
    this.setState({
      title,
      description,
      mediaType,
      embedURL,
      multimedia,
      step: 'preview',
    });
  };

  handleOnSubmit = () => {
    const { landId } = this.props;
    const { title, description, mediaType } = this.state;
    const multimedias = this.getMultimediaData();
    const data = {
      title,
      description,
      media_type: mediaType,
      multimedias,
    };
    LandAPI.registerMemory(landId, data)
      .then(() => {
        this.setState({
          step: 'done',
        });
      })
      .catch(() => {
        alert('Error on save memory. Please try again later.');
      });
  };

  handleOnMakeChanges = () => {
    this.setState({
      step: 'form',
    });
  };

  handleOnClose = () => {
    this.setState({
      title: '',
      description: '',
      mediaType: undefined,
      multimedia: [],
      step: 'form',
    });
    this.props.onClose();
  };

  getMultimediaData() {
    const { mediaType, embedURL } = this.state;

    const multimediaData = this.state.multimedia.map(item => ({
      name: item && item.name,
      type: mediaType,
      url: item && item.response && item.response.url,
    }));

    if (embedURL) {
      let type = '';
      switch (mediaType) {
        case 'video':
          type = 'youtube';
          break;
        case 'audio':
          type = 'spotify';
          break;
      }
      multimediaData.push({
        name: '',
        type,
        url: embedURL,
      });
    }

    return multimediaData;
  }

  getMultimediaPreview() {
    const { mediaType, embedURL } = this.state;

    const multimediaPreview = this.state.multimedia.map(item => ({
      id: item && item.uid,
      name: item && item.name,
      type: mediaType,
      url: item && item.response && item.response.url,
    }));

    if (embedURL) {
      let type = '';
      switch (mediaType) {
        case 'video':
          type = 'youtube';
          break;
        case 'audio':
          type = 'spotify';
          break;
      }
      multimediaPreview.push({
        id: 1,
        name: '',
        type,
        url: embedURL,
      });
    }

    return multimediaPreview;
    // return [
    //   {
    //     id: 'rc-1029',
    //     name: "cuadrado.png",
    //     type: "youtube",
    //     url: "https://www.youtube.com/embed/ViSpQbSnjHQ",
    //   },
    //   {
    //     id: 'rc-1029',
    //     name: "cuadrado.png",
    //     type: "spotify",
    //     url: "https://www.youtube.com/embed/ViSpQbSnjHQ",
    //   },
    //   {
    //     id: 'rc-1029',
    //     name: "cuadrado.png",
    //     type: "audio",
    //     url: "https://www.youtube.com/embed/ViSpQbSnjHQ",
    //   },
    //   {
    //     id: 'rc-1029',
    //     name: "cuadrado.png",
    //     type: "video",
    //     url: "https://www.youtube.com/embed/ViSpQbSnjHQ",
    //   },
    //   {
    //     id: 'rc-1030',
    //     name: "cuadrado.png",
    //     type: "image",
    //     url: "https://dummyimage.com/600x400/000/fff",
    //   },
    //   {
    //     id: 'rc-1032',
    //     name: "cuadrado.png",
    //     type: "image",
    //     url: "https://dummyimage.com/600x400/000/fff",
    //   },
    // ];
  }

  render() {
    const { visible } = this.props;
    const {
      title,
      description,
      mediaType,
      embedURL,
      multimedia,
      step,
    } = this.state;
    const multimediaPreview = this.getMultimediaPreview();
    return (
      <Modal
        visible={visible}
        width={720}
        footer={null}
        onCancel={this.handleOnClose}
        destroyOnClose
        wrapClassName="ant-modal-style2"
      >
        {step === 'form' && (
          <MemoryForm
            title={title}
            description={description}
            mediaType={mediaType}
            embedURL={embedURL}
            multimedia={multimedia}
            onSubmit={this.handleOnContinue}
          />
        )}
        {step === 'preview' && (
          <MemoryPreview
            title={title}
            description={description}
            multimedia={multimediaPreview}
            createdAt="10/10/2020"
            author="Jorge Moreira"
            onSubmit={this.handleOnSubmit}
            onMakeChanges={this.handleOnMakeChanges}
          />
        )}
        {step === 'done' && <MemorySuccessfulView onOk={this.handleOnClose} />}
      </Modal>
    );
  }
}

MemoryModalRegisterContainer.defaultValues = {
  landId: 0,
  visible: false,
  onClose: () => {},
};

MemoryModalRegisterContainer.propTypes = {
  landId: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MemoryModalRegisterContainer;
