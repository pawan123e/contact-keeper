const mongoose = require('mongoose');
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        validate: [validator.isEmail, 'Invalid email']
    },
    phone: {
       type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
       type: Date,
       default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Contact = mongoose.model('Contact', contactSchema);