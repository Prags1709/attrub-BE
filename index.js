const express = require("express")
const cors = require("cors")
const {connection} = require("./configuration/db")
const {userRoute} = require("./route/user.route")
const {carRoute} = require("./route/car.route")
const { oemRoute } =require('./route/oem.route')
const {authentication} = require("./middleware/authentication")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req, res)=>{
    res.send("WELCOME")
})

app.use("/user", userRoute)
app.use("/oem", oemRoute)
app.use(authentication)
app.use("/car", carRoute)

app.listen(process.env.port,async ()=>{
    try {
        await connection;
        console.log("DB CONNECTED");
    } catch (error) {
        console.log("DB NOT CONNECTED", error);
    }
    console.log(`port running at ${process.env.port}`);
})