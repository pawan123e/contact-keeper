const express = require('express');
const router = express.Router();

const {
    getUser
} = require('../controller/userController')
const {
    register,
    signIn,
    protect
} = require('../controller/authController')

router.route('/').get(protect,getUser);
router.route('/signUp').post(register);
router.route('/signIn').post(signIn)

module.exports = router;