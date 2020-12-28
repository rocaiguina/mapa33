import React, { useCallback } from 'react';
import { Button, Icon, Input, Upload } from 'antd';
import PropTypes from 'prop-types';

import PreviewVideo from '../previews/PreviewVideo';
import PreviewOEmbed from '../previews/PreviewOEmbed';
import EmbedEngine from '../../../utils/url-embed/EmbedEngine';

const EmbedEnginer = new EmbedEngine();

const VideoUploader = props => {
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
        <PreviewVideo
          src={file && file.response && file.response.url}
          title={file.name}
        />
      )}
      {embed && <PreviewOEmbed src={embed} />}
      {(file || embed) && (
        <Button
          block
          type="link"
          onClick={() => onRemove(file)}
          size="large"
          className="ant-btn-gray"
        >
          Eliminar Video
        </Button>
      )}
      {!(file || embed) && (
        <div className="form-style2">
          <div className="form-group">
            <label>Buscar video en tu dispositivo</label>
          </div>
          <div>
            <Upload
              accept="video/*"
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
            <label>Añade video de Youtube</label>
            <Input
              defaultValue={embed}
              onChange={handleOnChangeEmbed}
              className="form-control"
            />
            <span className="form-text">Inserta URL de Youtube Aquí</span>
          </div>
        </div>
      )}
    </div>
  );
};

VideoUploader.defaultProps = {
  files: [],
  embed: '',
  onChangeEmbed: () => {},
  onUpload: () => {},
  onRemove: () => {},
};

VideoUploader.propTypes = {
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

export default VideoUploader;
