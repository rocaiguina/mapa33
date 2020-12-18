import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import ProposedLandActivityItem from './ProposedLandActivityItem';
import MemoryActivityItem from './MemoryActivityItem';
import SupportedLandActivityItem from './SupportedLandActivityItem';

const { TabPane } = Tabs;

const MyActivities = props => {
  const {
    proposedLands,
    memories,
    supportedLands,
    onDeleteProposedLand,
    onDeleteMemory,
    onUnLike,
  } = props;

  return (
    <div>
      <h3>Mi actividad de Áreas</h3>
      <Tabs className="tab-style2">
        <TabPane
          key="proposed"
          tab={
            <h3>
              Propuestas <span>{proposedLands.length}</span>
            </h3>
          }
        >
          {proposedLands.map(item => (
            <ProposedLandActivityItem
              key={item.id}
              id={item.id}
              name={item.name}
              status={item.status}
              createdAt={item.createdAt}
              onDelete={onDeleteProposedLand}
            />
          ))}
          {proposedLands.length === 0 && (
            <p className="text-gray">No tienes propuestas registradas.</p>
          )}
        </TabPane>
        <TabPane
          key="memories"
          tab={
            <h3>
              Memorias <span>{memories.length}</span>
            </h3>
          }
        >
          {memories.map(item => (
            <MemoryActivityItem
              key={item.id}
              id={item.id}
              title={item.title}
              status={item.status}
              landId={item.land_id}
              onDelete={onDeleteMemory}
            />
          ))}
          {memories.length === 0 && (
            <p className="text-gray">No tienes memorias registradas.</p>
          )}
        </TabPane>
        <TabPane
          key="supported"
          tab={
            <h3>
              Apoyadas <span>{supportedLands.length}</span>
            </h3>
          }
        >
          {supportedLands.map(item => (
            <SupportedLandActivityItem
              key={item.id}
              id={item.id}
              land={item.land}
              onUnLike={onUnLike}
            />
          ))}
          {supportedLands.length === 0 && (
            <p className="text-gray">No tienes propuestas apoyadas.</p>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

MyActivities.defaultProps = {
  proposedLands: [],
  memories: [],
  supportedLands: [],
  onDeleteProposedLand: () => {},
  onDeleteMemory: () => {},
  onUnLike: () => {},
};

MyActivities.propTypes = {
  proposedLands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  memories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  supportedLands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  onDeleteProposedLand: PropTypes.func,
  onDeleteMemory: PropTypes.func,
  onUnLike: PropTypes.func,
};

export default MyActivities;
