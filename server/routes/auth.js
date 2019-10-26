const jwt = require('jsonwebtoken');
const express = require('express');
var db = require('../../db/models');
const User = db.User;
const router = express.Router();
//const UserController = require('../controllers/user');

router.post('/',function(req,res){
    User.findOne({
        where: {
            email:req.body.email,
            password: req.body.password
        }
    }).then(function (user) {
        //res.json(user);
        if(user != null){
            const user = {
                email: req.body.email,
                password: req.body.password
            };
            jwt.sign({user:user}, 'llave',(err, token)=>{
                res.json({
                    token
                })
            });
        }else{
            res.json('NO VÁLIDO');
        }
    }).catch(error => {
        res.json('no valido'+error);
    })

});

module.exports = router;