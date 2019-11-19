'use strict';

const Models            = require('../../db/models');
const User              = Models.User;
const Lands              = Models.Lands;


class DashboardController{
    index (req, res, next) {
        //TODO: get new lands
        Models.sequelize.
        query('SELECT * FROM lands WHERE status = \'New\' AND  "deletedAt" is null', { type: Models.sequelize.QueryTypes.SELECT }).
        then(new_land => {
            //TODO: get approved lands
            Models.sequelize.
            query('SELECT * FROM lands WHERE status = \'Approved\' AND "deletedAt" is null',{type: Models.sequelize.QueryTypes.SELECT}).
            then(approved_land =>{
                //TODO: get denied lands
                Models.sequelize.
                query('SELECT * FROM lands WHERE status = \'Denied\' AND "deletedAt" is null', {type: Models.sequelize.QueryTypes.SELECT}).
                then(denied_land => {
                    //TODO: get new Users
                    Models.sequelize.
                    query('Select * FROM "Users" WHERE "deletedAt" is null ORDER BY "createdAt" desc',{type: Models.sequelize.QueryTypes.SELECT}).
                    then(new_users =>{
                        for (let i = 0; i < Object.keys(new_users).length ; i++) {
                            new_users[i]['createdAt'] = new Date(new_users[i]['createdAt']).toDateString()
                        }
                        const data = {
                            new_land: Object.keys(new_land).length,
                            approved_land: Object.keys(approved_land).length,
                            denied_land: Object.keys(denied_land).length,
                            total_land: Object.keys(denied_land).length+Object.keys(new_land).length+Object.keys(approved_land).length,
                            data_new_land : new_land.slice(Math.max(new_land.length - 5, 0)), // mostrando los primeros 5
                            new_users: new_users.slice(Math.max(new_users.length -5 , 0)) // mostrando los primeros cinco
                        };
                        res.render('dashboard/index',data);
                    }).catch(error => {
                        console.log('Error new_users '+error)
                    })
                }).catch(error => {
                    console.log('Error denied_land '+error)
                })
            }).catch(error => {
                console.log('Error approved_land '+error);
            })
        }).catch(error => {
            console.log('Error new_land '+error)
        })


    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = new DashboardController();