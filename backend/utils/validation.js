const {body,validationResult} = require('express-validator');
const { validate } = require('../models/Developer');

const signupValidation=[
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({min:2})
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
    
   body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
]


const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const developerValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['Frontend', 'Backend', 'Full-Stack'])
    .withMessage('Invalid role'),
  
  body('techStack')
    .trim()
    .notEmpty()
    .withMessage('Tech stack is required'),
  
  body('experience')
    .notEmpty()
    .withMessage('Experience is required')
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number'),
  
  body('description')
    .optional()
    .trim()
];


const valide=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            message:errors.array()[0].msg
        })
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation,
    developerValidation,
    validate
}