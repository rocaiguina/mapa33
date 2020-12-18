import React, { useCallback, useEffect, useState } from 'react';
import { Modal, notification } from 'antd';

import MyActivities from '../../components/activity/MyActivities';
import ProfileApi from '../../api/profile';

const { confirm } = Modal;

const ProfileActivity = () => {
  const [proposedLands, setProposedLands] = useState([]);
  const [memories, setMemories] = useState([]);
  const [supportedLands, setSupportedLands] = useState([]);

  const handleOnDeleteProposedLand = useCallback(
    landId => {
      confirm({
        title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
        content: 'ELIMINAR PROPUESTA',
        cancelText: 'Sí',
        okText: 'No',
        onCancel() {
          ProfileApi.deleteProposedLand(landId)
            .then(() => {
              const newProposedLands = proposedLands.filter(
                item => item.id != landId
              );
              setProposedLands(newProposedLands);
              notification.success({
                message: 'Actualización satisfactoria',
                description: 'Se ha eliminado tu propuesta.',
              });
            })
            .catch(() => {
              notification.error({
                message: 'Error',
                description:
                  'No se logró eliminar tu propuesta. Por favor intenta nuevamente.',
              });
            });
        },
        className: 'modal-confirm-style2',
      });
    },
    [proposedLands]
  );

  const handleOnDeleteMemory = useCallback(
    memoryId => {
      confirm({
        title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
        content: 'ELIMINAR MEMORIA',
        cancelText: 'Sí',
        okText: 'No',
        onCancel() {
          ProfileApi.deleteMemory(memoryId)
            .then(() => {
              const newMemories = memories.filter(item => item.id != memoryId);
              setMemories(newMemories);
              notification.success({
                message: 'Actualización satisfactoria',
                description: 'Se ha eliminado tu memoria.',
              });
            })
            .catch(() => {
              notification.error({
                message: 'Error',
                description:
                  'No se logró eliminar tu memoria. Por favor intenta nuevamente.',
              });
            });
        },
        className: 'modal-confirm-style2',
      });
    },
    [memories]
  );

  const handleOnUnLike = useCallback(
    likeId => {
      confirm({
        title: '¿ESTÁS SEGURO QUE QUIERES TOMAR ESTA ACCIÓN?',
        content: 'DEJAR DE APOYAR LA PROPUESTA',
        cancelText: 'Sí',
        okText: 'No',
        onCancel() {
          ProfileApi.unLikeLand(likeId)
            .then(() => {
              const newSupportedLands = supportedLands.filter(
                item => item.id != likeId
              );
              setSupportedLands(newSupportedLands);
              notification.success({
                message: 'Actualización satisfactoria',
                description: 'Haz dejado de apoyar una propuesta.',
              });
            })
            .catch(() => {
              notification.error({
                message: 'Error',
                description:
                  'No se logró cancelar el apoyo. Por favor intenta nuevamente.',
              });
            });
        },
        className: 'modal-confirm-style2',
      });
    },
    [supportedLands]
  );

  useEffect(() => {
    ProfileApi.activities()
      .then(response => {
        setProposedLands(response.proposedLands);
        setMemories(response.memories);
        setSupportedLands(response.supportedLands);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <MyActivities
      proposedLands={proposedLands}
      memories={memories}
      supportedLands={supportedLands}
      onDeleteProposedLand={handleOnDeleteProposedLand}
      onDeleteMemory={handleOnDeleteMemory}
      onUnLike={handleOnUnLike}
    />
  );
};

export default ProfileActivity;
