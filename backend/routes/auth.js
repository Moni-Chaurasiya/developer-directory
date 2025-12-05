const express= require('express');
const router= express.Router();

const {signup,login,getMe}= require('../controllers/authController')

const {signupValidation,loginValidation,validate}= require('../utils/validation')
const auth=require('../middleware/auth');


router.post('/signup',signupValidation,validate,signup);
router.post('/login',loginValidation,validate,login);
router.get('/me',auth, getMe);

module.exports=router;