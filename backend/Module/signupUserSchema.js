const mongoose = require('mongoose')


const signupUserSchema = new mongoose.Schema({
    
    
    firstName: {
        type: String, unique: false, require: true
    },
    lastName: {
        type: String, unique: false, require: true
    },
    email: {
        type: String, unique: true, require: true
    },
    password: {
        type: String, require: true, minlength: 6
    }
})

const signupUser = mongoose.model('signupUser', signupUserSchema)

module.exports = signupUser