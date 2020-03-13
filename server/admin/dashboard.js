'use strict';

const Models = require('../../db/models');

class DashboardController {
  index(req, res) {
    //TODO: get new lands
    Models.sequelize
      .query(
        'SELECT * FROM lands WHERE status = \'New\' AND  "deletedAt" is null',
        { type: Models.sequelize.QueryTypes.SELECT }
      )
      .then(function(new_land) {
        //TODO: get approved lands
        Models.sequelize
          .query(
            'SELECT * FROM lands WHERE status = \'Approved\' AND "deletedAt" is null',
            { type: Models.sequelize.QueryTypes.SELECT }
          )
          .then(function(approved_land) {
            //TODO: get denied lands
            Models.sequelize
              .query(
                'SELECT * FROM lands WHERE status = \'Denied\' AND "deletedAt" is null',
                { type: Models.sequelize.QueryTypes.SELECT }
              )
              .then(function(denied_land) {
                //TODO: get new Users
                Models.sequelize
                  .query(
                    'Select * FROM "Users" WHERE "deletedAt" is null ORDER BY "createdAt" desc',
                    { type: Models.sequelize.QueryTypes.SELECT }
                  )
                  .then(function(new_users) {
                    for (let i = 0; i < Object.keys(new_users).length; i++) {
                      new_users[i]['createdAt'] = new Date(
                        new_users[i]['createdAt']
                      ).toDateString();
                    }
                    const data = {
                      new_land: Object.keys(new_land).length,
                      approved_land: Object.keys(approved_land).length,
                      denied_land: Object.keys(denied_land).length,
                      total_land:
                        Object.keys(denied_land).length +
                        Object.keys(new_land).length +
                        Object.keys(approved_land).length,
                      data_new_land: new_land.slice(
                        Math.max(new_land.length - 5, 0)
                      ), // mostrando los primeros 5
                      new_users: new_users.slice(
                        Math.max(new_users.length - 5, 0)
                      ), // mostrando los primeros cinco
                    };
                    res.render('dashboard/index', data);
                  })
                  .catch(function(err) {
                    console.log('Error new_users ' + err);
                  });
              })
              .catch(function(err) {
                console.log('Error denied_land ' + err);
              });
          })
          .catch(function(err) {
            console.log('Error approved_land ' + err);
          });
      })
      .catch(function(err) {
        console.log('Error new_land ' + err);
      });
  }
}

module.exports = new DashboardController();
