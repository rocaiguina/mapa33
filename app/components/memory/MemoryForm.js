import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Col, Input, Modal, Radio, Row, Typography } from 'antd';
import * as Yup from 'yup';

import ImageUploader from '../multimedia/uploader/ImageUploader';
import VideoUploader from '../multimedia/uploader/VideoUploader';
import AudioUploader from '../multimedia/uploader/AudioUploader';

const { TextArea } = Input;
const { Text } = Typography;
const { confirm } = Modal;

const memoryValidationSchema = Yup.object().shape({
  title: Yup.string().required('Campo requerido.'),
  description: Yup.string().required('Campo requerido.'),
});

const MemoryForm = props => {
  const {
    title,
    description,
    mediaType,
    embedURL,
    multimedia,
    onSubmit,
  } = props;
  const [mediaTypeSelected, setMediaTypeSelected] = useState(mediaType);
  const [uploadedFiles, setUploadedFiles] = useState(multimedia);
  const [currentEmbedURL, setCurrentEmbedURL] = useState(embedURL);

  const handleOnChangeMediaType = useCallback(
    event => {
      if ((uploadedFiles && uploadedFiles.length > 0) || currentEmbedURL) {
        return confirm({
          title: '¿Estás seguro de que quieres hacer esto?',
          content:
            'Si cambias de tipo de memorias, las fotos, video o audio que habías incluidos se perderá.',
          onOk() {
            setUploadedFiles([]);
            setMediaTypeSelected(event.target.value);
            setCurrentEmbedURL('');
          },
        });
      }
      setMediaTypeSelected(event.target.value);
    },
    [uploadedFiles, currentEmbedURL]
  );

  const handleOnUploadFile = useCallback(file => {
    setUploadedFiles(prevUploadedFiles => {
      return [...prevUploadedFiles, file];
    });
  }, []);

  const handleOnRemoveFile = useCallback(
    file => {
      if (file) {
        const files = uploadedFiles.filter(item => item.uid !== file.uid);
        setUploadedFiles(files);
      }
      setCurrentEmbedURL('');
    },
    [uploadedFiles]
  );

  const handleOnSubmit = useCallback(
    values => {
      const data = {
        ...values,
        multimedia: uploadedFiles,
        mediaType: mediaTypeSelected,
        embedURL: currentEmbedURL,
      };
      onSubmit(data);
    },
    [uploadedFiles, mediaTypeSelected, currentEmbedURL]
  );

  return (
    <Row gutter={30}>
      <Col md={12}>
        <h2 className="memory-title">
          COMPARTE TUS MEMORIAS DE EL TERRENO DEL FUTURO
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Col>
      <Col md={12}>
        <Formik
          initialValues={{ title, description }}
          onSubmit={handleOnSubmit}
          validationSchema={memoryValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-style2">
                <div className="form-group">
                  <label>Título de tu memoria (requerido)</label>
                  <Input
                    defaultValue={title}
                    name="title"
                    onChange={handleChange}
                    className="form-control"
                  />
                  <Text type="danger">{errors.title}</Text>
                </div>
                <div className="form-group">
                  <label>Descripción (requerido)</label>
                  <TextArea
                    defaultValue={description}
                    name="description"
                    rows={4}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <span className="form-text">Límite de 300 caracteres</span>
                  <Text type="danger">{errors.description}</Text>
                </div>
                <div className="form-group">
                  <label>Añade fotos, video o audio</label>
                  <span className="form-text">
                    Solo escoge un tipo de medio por entrada
                  </span>
                </div>
              </div>
              <div className="m-b-15">
                <Radio.Group
                  defaultValue={mediaType}
                  value={mediaTypeSelected}
                  onChange={handleOnChangeMediaType}
                  className="media-radio-group"
                >
                  <Radio.Button value="image">
                    <img
                      src={
                        mediaTypeSelected === 'image'
                          ? '/images/memory/icons-image-active.svg'
                          : '/images/memory/icons-image.svg'
                      }
                    />
                  </Radio.Button>
                  <Radio.Button value="video">
                    <img
                      src={
                        mediaTypeSelected === 'video'
                          ? '/images/memory/icons-video-active.svg'
                          : '/images/memory/icons-video.svg'
                      }
                    />
                  </Radio.Button>
                  <Radio.Button value="audio">
                    <img
                      src={
                        mediaTypeSelected === 'audio'
                          ? '/images/memory/icons-audio-active.svg'
                          : '/images/memory/icons-audio.svg'
                      }
                    />
                  </Radio.Button>
                </Radio.Group>
              </div>
              {mediaTypeSelected === 'image' && (
                <ImageUploader
                  files={uploadedFiles}
                  onUpload={handleOnUploadFile}
                  onRemove={handleOnRemoveFile}
                />
              )}
              {mediaTypeSelected === 'video' && (
                <VideoUploader
                  files={uploadedFiles}
                  embedURL={currentEmbedURL}
                  onChangeEmbedURL={setCurrentEmbedURL}
                  onUpload={handleOnUploadFile}
                  onRemove={handleOnRemoveFile}
                />
              )}
              {mediaTypeSelected === 'audio' && (
                <AudioUploader
                  files={uploadedFiles}
                  embedURL={currentEmbedURL}
                  onChangeEmbedURL={setCurrentEmbedURL}
                  onUpload={handleOnUploadFile}
                  onRemove={handleOnRemoveFile}
                />
              )}
              <div>
                <Button
                  block
                  shape="round"
                  htmlType="submit"
                  className="ant-btn-purple"
                  size="large"
                >
                  Continuar
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

MemoryForm.defaultProps = {
  title: '',
  description: '',
  mediaType: undefined,
  embedURL: '',
  multimedia: [],
  onSubmit: () => {},
};

MemoryForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  mediaType: PropTypes.string,
  embedURL: PropTypes.string,
  multimedia: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      name: PropTypes.string,
      response: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ),
  onSubmit: PropTypes.func,
};

export default MemoryForm;
