const express = require("express")
const {InventoryModel} = require("../model/marketplace_inventory.model")
const carRoute = express.Router()

//get all the second-hand data
carRoute.get("/allCar", async (req, res)=>{
    try {
        const cars = await InventoryModel.find();
        res.status(200).send(cars);
    } catch (error) {
        res.status(404).send({message:error})
    }
})

//added second-hand car data by dealer
carRoute.post("/addCar", async (req, res)=>{
    const body = req.body;
    try {
        const car = new InventoryModel(body);
        await car.save()
        res.status(201).send({message:"Car data has been added"})
    } catch (error) {
        res.status(404).send({message:error})
    }
})

//edit second-hand car data (It can be only edit by dealer of the data)
carRoute.patch("/update/:id", async (req, res)=>{
    const id = req.params.id;
    const payload = req.body;
    const carData = await InventoryModel.findOne({_id:id})
    if(!carData){
        res.status(404).send({message:"Data not found"})
    }else{
        const userID_in_cardata = carData.userID;
        const userID_making_req = req.body.userID;

        try {
            if(userID_making_req !== userID_in_cardata){
                res.send({"msg":"Your not authorized to Edit & Delete this Data, authorized for only own Dealer"})
            }else{
                await InventoryModel.findByIdAndUpdate({_id:id},payload)
                res.send("Car data has been updated")
            }
        } catch (error) {
            console.log(error);
            res.send({"msg":"Something went wrong", "Error":error})
        }
    }
})

//edit second-hand car data (It can be only edit by dealer of the data)
carRoute.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    const carData = await InventoryModel.findOne({_id:id})
    if(!carData){
        res.status(404).send({message:"Data not found"})
    }else{
        const userID_in_cardata = carData.userID;
        const userID_making_req = req.body.userID;

        try {
            if(userID_making_req !== userID_in_cardata){
                res.send({"msg":"Your not authorized to Edit & Delete this Data, authorized for only own Dealer"})
            }else{
                await InventoryModel.findByIdAndDelete({_id:id})
                res.send({"msg":"Data deleted successfully"})
            }
        } catch (error) {
            console.log(error);
            res.send({"msg":"Something went wrong","Error":error})
        }
    }
})

module.exports = {carRoute}