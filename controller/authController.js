const User = require('../models/User')
const catchAsync = require('../utils/asyncError')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const {promisify} = require('util')

exports.register =catchAsync (async(req, res, next) =>{
        const user = await User.create(req.body);
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn: '10d'
        })
        res.status(200).json({
            status: 'success',
            data: {
                token
            }
        })    
})

exports.signIn = catchAsync(async (req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password){
      return next(new AppError('Enter a valid email or password', 401))
    }
    const user = await User.findOne({email}).select('+password');
    if(!user || !(await user.checkPassword(password, user.password))){
        return next(new AppError('Invalid email address or password', 400))
    }
    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '3d'})
    res.status(200).json({
        status: 'success',
        token
    })
})

exports.protect = catchAsync(async (req, res, next) =>{
    if(!req.headers.authorization){
      return next(new AppError('Unauthorized access..', 401)) 
    }
    const token = req.headers.authorization;
    const decoded =await promisify(jwt.verify)(token, process.env.SECRET_KEY)
    
    if(!decoded){
        return next(new AppError('Token is not valid', 400));
    }
    const user = await User.findById(decoded.id);
    if(!user){
        return next(new AppError('Invalid user access', 400));
    }

    req.user = decoded;
    next();
})

