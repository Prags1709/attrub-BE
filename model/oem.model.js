const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
    image: {type:String, required:true},
    modelName: {type:String, required:true},
    yearOfModel: {type:Number, required:true},
    price: {type:Number, required:true},
    color: [{type:String, required:true}],
    mileage: {type:String, required:true},
    power: {type:String, required:true},
    maxSpeed: {type:String, required:true}
})

const OemModel = mongoose.model("oem", oemSchema);

module.exports = {OemModel}