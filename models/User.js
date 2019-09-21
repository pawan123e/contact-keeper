const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide user name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password length is less than 8 characters'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide confirmPassword'],
        validate: {
            validator : function(el) {
            return el === this.password
        },
        message: 'Passwords do not match'
    }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.checkPassword = async(candidatePassword, realPassword) =>{
    return await bcrypt.compare(candidatePassword, realPassword)
}
module.exports = User = mongoose.model('User', userSchema);