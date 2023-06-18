const jwt = require("jsonwebtoken")
require('dotenv').config()

const authentication = (req, res, next)=>{
    const token = req.headers.authorization;
    if(token){
        const decode = jwt.verify(token, process.env.key)
        if(decode){
            //console.log(decode);
            const userID = decode.userID;
            req.body.userID = userID;
            next()
        }else{
            res.status(404).send({message:"Please login First"})
        }
    }else{
        res.status(404).send({message:"Please login First"})
    }
}

module.exports = {authentication}