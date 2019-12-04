import React from 'react';
import YouTube from 'react-youtube';
import Button from '../ui/Button';

class Video extends React.Component {
  handleOnReady = (event) => {
    this.player = event.target;
  }

  handleOnSkip = (event) => {
    this.player.pauseVideo();
    if (this.props.onSkip) {
      this.props.onSkip(event);
    }
  }

  render () {
    const opts = {
      playerVars: {
        autoplay: 0
      }
    };

    return (
      <div className="intro">
        <div className="embed-responsive embed-responsive-21by9">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={this.handleOnReady} onEnd={this.props.onEnd}/>
        </div>
        <div className="m-t-15 text-right">
          <Button type="primary" ghost onClick={this.handleOnSkip}>SKIP <i className="m33-icon m33-icon-arrow-right"></i></Button>
        </div>
      </div>
    );
  }
}

export default Video