const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usename:String,
    password:String,
    age:Number
});

module.exports = mongoose.model('users',userSchema)