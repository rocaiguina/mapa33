import React from 'react';
import YouTube from 'react-youtube';
import { Button } from 'antd';

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
      <div>
        <div className="embed-responsive embed-responsive-21by9">
          <YouTube videoId={this.props.videoId} opts={opts} onReady={this.handleOnReady} onEnd={this.props.onEnd}/>
        </div>
        <div>
          <Button onClick={this.handleOnSkip}>SKIP</Button>
        </div>
      </div>
    );
  }
}

export default Video