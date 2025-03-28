const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    username : {
        type : String,
        required : true,
        unique : true,
        minlength : 3
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    telephone: {
        type: String,
        required: true,
        match: [/^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'Please enter a valid phone number']
    },
    img: { type: String, default: '' }
} , {timestamps : true});

userSchema.method.toJson = function(){
    const obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
}

const User = mongoose.model('Users', userSchema , 'Users');

module.exports = User;