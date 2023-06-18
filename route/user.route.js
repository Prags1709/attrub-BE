const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const userRoute = express.Router()

//Register
userRoute.post("/signup", async (req, res) => {
    const { name, email, password, phoneNo } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, securePassword) => {
            if (err) {
                console.log(err);
                res.send({ message: "Something went wrong" })
            } else {
                let user = new UserModel({ name, email, password: securePassword, phoneNo })
                await user.save()
                res.status(201).send({ message: "User has been successfully registered" });
            }
        })
    } catch (error) {
        console.log(error);
        res.send("User Register failed", { message: error })
    }
})

//login
userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            res.send({ message: "Please signup first" })
        } else {
            const hash_password = user?.password;
            bcrypt.compare(password, hash_password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.key , { expiresIn: '3h' });
                    const refresh_token = jwt.sign({ userID: user._id }, "R_unlock", { expiresIn: '15h' });
                    res.send({ msg: "Login successfully", token, refresh_token, userid: user._id })
                } else {
                    res.send({ message: "Something went wrong, login failed" })
                }
            })
        }
    } catch (error) {
        res.send({ message: "Error in login the user" })
        console.log(error);
    }
})

module.exports = { userRoute }

