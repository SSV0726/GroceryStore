var mongoose = require('mongoose');

var prodSchema = new mongoose.Schema({
    date : { type: Date, default: Date.now },
    product : String,
    price : {type:Number,min: 1},
    qty : Number
})

var userSchema = new mongoose.Schema({
    name : String ,
    mobile : String,
    email : String ,
    password : String ,
    products : [prodSchema]
})

module.exports = mongoose.model("User",userSchema);