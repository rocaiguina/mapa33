'use strict';

const Models = require('../../db/models');
const Land = Models.Land;
const Memory = Models.Memory;
const LandLikes = Models.LandLikes;

const getActivities = (req, res) => {
  const queries = [
    Land.findAll({
      where: {
        user_id: req && req.user && req.user.id,
      },
      attributes: { exclude: ['geom'] },
      order: [['createdAt', 'DESC']],
    }),
    Memory.findAll({
      where: {
        user_id: req && req.user && req.user.id,
      },
      order: [['createdAt', 'DESC']],
    }),
    LandLikes.findAll({
      where: {
        user_id: req && req.user && req.user.id,
      },
      order: [['liked_at', 'DESC']],
      include: [
        {
          model: Land,
          as: 'land',
          attributes: ['name'],
        },
      ],
    }),
  ];

  Promise.all(queries)
    .then(([proposedLands, memories, landLikes]) => {
      const supportedLands = landLikes.map(item => {
        return {
          id: item.id,
          land: {
            id: item.land_id,
            name: item.land && item.land.name,
          },
          liked_at: item.liked_at,
          user_id: item.user_id,
        };
      });

      const data = {
        proposedLands,
        memories,
        supportedLands,
      };
      res.json(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const deleteProposedLand = (req, res) => {
  const { id } = req.params;
  Land.destroy({
    where: {
      user_id: req && req.user && req.user.id,
      id,
    },
  })
    .then(() => {
      res.json('');
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const deleteMemory = (req, res) => {
  const { id } = req.params;
  Memory.destroy({
    where: {
      user_id: req && req.user && req.user.id,
      id,
    },
  })
    .then(() => {
      res.json('');
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

const unLikeLand = (req, res) => {
  const { id } = req.params;
  LandLikes.findOne({
    where: {
      user_id: req && req.user && req.user.id,
      id,
    },
  })
    .then(landLike => {
      if (!landLike) {
        return res.status(404).send();
      }

      Promise.all([
        Land.decrement('likes', {
          where: { id: landLike.land_id },
        }),
        landLike.destroy(),
      ])
        .then(() => {
          res.json('');
        })
        .catch(err => {
          res.status(400).send(err);
        });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports = {
  getActivities,
  deleteProposedLand,
  deleteMemory,
  unLikeLand,
};
