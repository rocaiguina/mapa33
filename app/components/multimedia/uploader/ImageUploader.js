import React, { useCallback } from 'react';
import { Button, Icon, Upload } from 'antd';
import PropTypes from 'prop-types';

const ImageUploader = props => {
  const { files, onRemove, onUpload } = props;

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

  return (
    <div>
      <div className="form-group">
        <label>Imágenes escogidas ({files.length})</label>
      </div>
      <div className="form-group">
        <Upload
          accept="image/*"
          className="ant-upload-block"
          action="http://localhost:3000/api/file"
          onChange={handleOnChange}
          defaultFileList={files}
        >
          <Button block shape="round" size="large" className="ant-btn-gray">
            <Icon type="plus" />
          </Button>
        </Upload>
      </div>
    </div>
  );
};

ImageUploader.defaultProps = {
  files: [],
  onUpload: () => {},
  onRemove: () => {},
};

ImageUploader.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      name: PropTypes.string,
      response: PropTypes.shape({
        url: PropTypes.string,
      }),
    })
  ),
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
};

export default ImageUploader;
