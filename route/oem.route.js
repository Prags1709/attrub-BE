const express = require("express")
const {OemModel} = require("../model/oem.model")
const oemRoute = express.Router()

oemRoute.get("/allOem", async (req, res)=>{
    try {
        const oemCars = await OemModel.find();
        res.status(200).send(oemCars);
    } catch (error) {
        res.status(404).send({message:error})
    }
})

oemRoute.post("/oemAdd", async (req, res)=>{
    const body = req.body;
    try {
        const car = new OemModel(body);
        await car.save()
        res.status(201).send({message:"data has been created"})
    } catch (error) {
        res.status(404).send({message:error})
    }
})

module.exports = {oemRoute}