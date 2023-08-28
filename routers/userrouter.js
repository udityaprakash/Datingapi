const router = require("express").Router();
const signup = require("../componnents/authentications/user/signup");
const login= require("../componnents/authentications/user/login");
const dashboard=require("../componnents/dashboard/user/dashboard");
const forgetpass=require("../componnents/authentications/user/forgetpass");
const choice = require("../componnents/home/choicefilling");
const { author } = require("../componnents/authentications/jwt/authentication");
const uploadImg = require('../componnents/middlewares/profileimg');

//--user/signup
router.post('/signup', uploadImg.single('proc'), signup.post);
router.get('/signup',signup.get);
router.get('/signup/verifyotp/:email',signup.verifyotp);
router.post('/signup/verifyotp/:email',signup.checkotp);




//--user/login
router.post('/login',login.post);
router.get('/login',login.get);
router.get("/login/forgetpass",forgetpass.get_enteremail);
router.post("/login/forgetpass",forgetpass.post_enteremail);
router.post("/login/forgetpass/verification",forgetpass.post_otp_verification);
router.post("/login/forgetpass/verified",forgetpass.Set_password);


//--user/dashboard
router.get('/dashboard/:id',dashboard.get);


//--choice filling system
router.get('/choice', author , choice.get);
router.post('/choice', author , choice.create);



module.exports = router;