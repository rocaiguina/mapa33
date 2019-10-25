var db = require('../../db/models');
const User = db.User;
module.exports = {
    getUsuarioById:function (req,res) {
        User.findOne({
           where: {
               id:req.params.id
           }
       }).then(function (user) {
               res.json(user);
       }).catch(error => {
            console.log('Error: \n'+error)
       })
    },
    getUsuarios:function (req,res) {
        User.findAll()
            .then(function(users){
                res.json(users)
            }).catch(error => {
            console.log('Error: \n'+error)
        })
    },
    postInsertUsuario:function (req, res) {
       User.create({
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           email: req.body.email,
           password:req.body.password
       }).then(function (user) {
           res.json('ok');
       }).catch(error => {
           console.log('Error: \n'+error)
       })
    },
    putUpdateUsuario:function (req,res) {
        User.update (
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ).then (function ( rowsUpdated) {
                res.json ('ok')
        }).catch(error => {
            console.log('Error: \n'+error)
        })
    },
    deleteDeleteUsuario:function (req,res) {
        console.log('Entro a la funcion');
        User.destroy({
            where:{
                id:req.params.id
            }
        }).then(function(mensaje){
            res.json(mensaje);
        }).catch(error => {
            console.log('Error: \n'+error)
        })
    }
};