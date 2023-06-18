const mongoose = require("mongoose");
const {UserModel} = require("./user.model")

const marketplaceInventorySchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: UserModel},
    userID: {type:String, required:true},
    image: {type:String, required:true},
    title: {type:String, required:true},
    discription: [{type:String}],
    kilometer: {type:String, required:true},
    scartchs: {type:String, required:true},
    color: {type:String, required:true},
    noOfAccidents: {type:Number, required:true},
    noOfPreviousBuyers: {type:Number, required:true},
    registrationPlace: {type:String, required:true}
})

const InventoryModel = mongoose.model("inventory", marketplaceInventorySchema)

module.exports = {InventoryModel}