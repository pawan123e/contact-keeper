const User = require('../models/User')
const AsyncError = require('../utils/asyncError')
exports.getUser = AsyncError(async (req, res, next) =>{
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        status: 'success',
        user
    })
})