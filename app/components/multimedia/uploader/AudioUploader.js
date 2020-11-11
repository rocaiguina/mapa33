import React, { useCallback } from 'react';
import { Button, Icon, Input, Upload } from 'antd';
import PropTypes from 'prop-types';

import PreviewAudio from '../previews/PreviewAudio';
import PreviewSpotify from '../previews/PreviewSpotify';

const AudioUploader = props => {
  const { embedURL, files, onChangeEmbedURL, onRemove, onUpload } = props;

  const handleOnChange = useCallback(
    ({ file }) => {
      if (file.status === 'done') {
        onUpload(file);
      }
      if (file.status === 'removed') {
        onRemove(file);
      }
    },
    [onUpload, onRemove]
  );

  const handleOnChangeEmbedURL = useCallback(
    event => {
      onChangeEmbedURL(event.target.value);
    },
    [onChangeEmbedURL]
  );

  const file = files.length > 0 ? files[0] : false;
  return (
    <div>
      {file && <PreviewAudio src={file.src} title={file.name} />}
      {embedURL && <PreviewSpotify src={embedURL} title="" />}
      {(file || embedURL) && (
        <a href="#" onClick={onRemove}>
          Eliminar Audio
        </a>
      )}
      {!(file || embedURL) && (
        <div>
          <div>
            <label>Buscar audio en tu dispositivo</label>
            <Upload
              accept="audio/*"
              className="ant-upload-block"
              action="http://localhost:3000/api/file"
              onChange={handleOnChange}
              defaultFileList={files}
            >
              <Button block shape="round">
                <Icon type="plus" />
              </Button>
            </Upload>
          </div>
          <div>
            <label>ó</label>
          </div>
          <div>
            <label>Añade enlace URL</label>
            <Input defaultValue={embedURL} onChange={handleOnChangeEmbedURL} />
            <span>Inserta URL de Soundcloud o Spotify</span>
          </div>
        </div>
      )}
    </div>
  );
};

AudioUploader.defaultProps = {
  files: [],
  embedURL: '',
  onChangeEmbedURL: () => {},
  onUpload: () => {},
  onRemove: () => {},
};

AudioUploader.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      name: PropTypes.string,
      response: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ),
  embedURL: PropTypes.string,
  onChangeEmbedURL: PropTypes.func,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
};

export default AudioUploader;
