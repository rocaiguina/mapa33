import React from 'react';
import PropTypes from 'prop-types';
import Empty from './Empty';
import Item from './Item';

class List extends React.Component {
  render() {
    const lands = this.props.lands;

    if (lands && lands.length == 0) {
      return <Empty />;
    }

    return (
      <div className="table-responsive">
        <table className="table table-land-dark">
          <tbody>
            {lands &&
              lands.map(land => (
                <Item
                  key={land.id}
                  id={land.id}
                  name={land.name}
                  level={land.level}
                  owner={land.owner}
                  location={land.location}
                  area_size={land.area_size}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

List.propTypes = {
  lands: PropTypes.array.isRequired,
};

export default List;
