import React from 'react';
import PropTypes from 'prop-types';
import { notification, Spin } from 'antd';
import MemoryList from '../components/memory/MemoryList';
import MemoryModalPreview from '../components/memory/MemoryModalPreview';

import LandApi from '../api/land';

class MemoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      preview: false,
      memories: [],
      memory: {},
    };
  }

  componentDidMount() {
    const { landId } = this.props;
    this.fetchMemories(landId);
  }

  fetchMemories(landId) {
    const self = this;
    LandApi.getMemories(landId)
      .then(response => {
        self.setState({
          memories: response.docs,
          loading: false,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description:
            'No se logró recuperar las memorias. Por favor intenta nuevamente.',
        });
      });
  }

  handleOnMemoryClick = memory => {
    this.setState({
      memory,
      preview: true,
    });
  };

  handleOnClosePreview = () => {
    this.setState({
      memory: {},
      preview: false,
    });
  };

  render() {
    const { loading, memories, preview, memory } = this.state;
    if (loading) {
      return (
        <div className="memory-list-spin">
          <Spin />
        </div>
      );
    }

    if (!loading && memories.length == 0) {
      return (
        <div className="memory-empty-list">Aún no hay memorias publicadas</div>
      );
    }

    return (
      <div>
        <MemoryList data={memories} onMemoryClick={this.handleOnMemoryClick} />
        <MemoryModalPreview
          title={memory.title}
          description={memory.description}
          createdAt={memory.createdAt}
          author={memory.author}
          multimedias={memory.multimedias}
          onClose={this.handleOnClosePreview}
          visible={preview}
        />
      </div>
    );
  }
}

MemoryListContainer.propTypes = {
  landId: PropTypes.number,
};

export default MemoryListContainer;
