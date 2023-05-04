const express=require('express')
const { signIn, signUp } = require('../controller/User_controller')
const { verifyUser } = require('../Mallware/Auth')





const router_user=express.Router()

router_user.route('/signin/user').post(signIn)
router_user.route('/signup/user').post(signUp)
router_user.route('/verify/user').post(verifyUser)

module.exports=router_user;