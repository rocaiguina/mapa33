import React from 'react';
import PropTypes from 'prop-types';
import { Button, notification, Spin } from 'antd';
import MemoryList from '../components/memory/MemoryList';
import MemoryModalPreview from '../components/memory/MemoryModalPreview';

import LandApi from '../api/land';

class MemoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasMore: false,
      loadingMore: false,
      loading: true,
      preview: false,
      memories: [],
      memory: {},
    };
  }

  componentDidMount() {
    const { landId } = this.props;
    const { page } = this.state;
    this.fetchMemories(landId, page);
  }

  fetchMemories(landId, page) {
    const self = this;
    LandApi.getMemories(landId, page)
      .then(response => {
        self.setState({
          memories: [...self.state.memories, ...response.docs],
          loading: false,
          loadingMore: false,
          hasMore: response.has_next_page,
          page: response.next_page,
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

  handleLoadMore = () => {
    const { landId } = this.props;
    const { page } = this.state;
    this.setState({
      loadingMore: true,
    });
    this.fetchMemories(landId, page);
  };

  render() {
    const {
      hasMore,
      loading,
      loadingMore,
      memories,
      preview,
      memory,
    } = this.state;

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
        {loadingMore && (
          <div className="memory-list-spin">
            <Spin />
          </div>
        )}
        {memories.length > 0 && (
          <div className="text-center">
            <Button
              className="ant-btn-dark"
              shape="round"
              size="large"
              disabled={!hasMore}
              onClick={this.handleLoadMore}
            >
              LOAD MORE
            </Button>
          </div>
        )}
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
