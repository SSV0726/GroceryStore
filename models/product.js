var mongoose = require("mongoose");

var prodSchema = new mongoose.Schema({
    image : String,
    name : String,
    price : {type:Number,min: 1},
    desc : String ,
})

module.exports = mongoose.model("product",prodSchema);