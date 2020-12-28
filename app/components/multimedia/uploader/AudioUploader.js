import React, { useCallback } from 'react';
import { Button, Icon, Input, Upload } from 'antd';
import PropTypes from 'prop-types';

import PreviewAudio from '../previews/PreviewAudio';
import PreviewOEmbed from '../previews/PreviewOEmbed';
import EmbedEngine from '../../../utils/url-embed/EmbedEngine';

const EmbedEnginer = new EmbedEngine();

const AudioUploader = props => {
  const { embed, files, onChangeEmbed, onRemove, onUpload } = props;

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

  const handleOnChangeEmbed = useCallback(
    event => {
      if (event.target.value) {
        EmbedEnginer.getEmbed(event.target.value)
          .then(embed => {
            onChangeEmbed(embed.data.html);
          })
          .catch(() => {});
      }
    },
    [onChangeEmbed]
  );

  const file = files.length > 0 ? files[0] : false;
  return (
    <div>
      {file && (
        <PreviewAudio
          src={file && file.response && file.response.url}
          title={file.name}
        />
      )}
      {embed && <PreviewOEmbed html={embed} />}
      {(file || embed) && (
        <Button
          block
          type="link"
          onClick={() => onRemove(file)}
          size="large"
          className="ant-btn-gray"
        >
          Eliminar Audio
        </Button>
      )}
      {!(file || embed) && (
        <div className="form-style2">
          <div className="form-group">
            <label>Buscar audio en tu dispositivo</label>
          </div>
          <div>
            <Upload
              accept="audio/*"
              className="ant-upload-block"
              action="/api/file"
              onChange={handleOnChange}
              defaultFileList={files}
            >
              <Button block shape="round" size="large" className="ant-btn-gray">
                <Icon type="plus" />
              </Button>
            </Upload>
          </div>
          <div className="form-group text-center">
            <label>ó</label>
          </div>
          <div className="form-group">
            <label>Añade enlace URL</label>
            <Input
              defaultValue={embed}
              onChange={handleOnChangeEmbed}
              className="form-control"
            />
            <span className="form-text">
              Inserta URL de Soundcloud o Spotify
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

AudioUploader.defaultProps = {
  files: [],
  embed: '',
  onChangeEmbed: () => {},
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
  embed: PropTypes.string,
  onChangeEmbed: PropTypes.func,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
};

export default AudioUploader;
