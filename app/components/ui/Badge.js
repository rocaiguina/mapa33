import React from 'react';
import ClassNames from 'classnames';

class Badge extends React.Component {
  render () {
    const badgeClass = ClassNames('badge', {
      'badge-lg': this.props.size == 'large',
      'badge-xlg': this.props.size == 'xlarge',
      'badge-blue': this.props.color == 'blue',
      'badge-orange': this.props.color == 'orange',
      'badge-pink': this.props.color == 'pink',
      'badge-green': this.props.color == 'green',
      'badge-white': this.props.color == 'white',
      'badge-round': this.props.round ? true : false,
      'badge-block': this.props.block ? true : false
    });

    return (
      <div className={badgeClass} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default Badge;
