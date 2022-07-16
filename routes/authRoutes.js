const express = require('express');
const router = express.Router();
const { checkAdmin, checkUser } = require('../middleware/auth');

router.get("/jwtid", checkUser, (req, res) => {
    return res.status(200).json({user : res.locals.user})
    });
 
 router.get("/jwtid/admin", checkAdmin, (req, res) => {
     return res.status(200).json({user : res.locals.user})
     });

     module.exports = router