const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;
const mongoose = require("mongoose");

module.exports = (req,res, next)=>{
    console.log("Aunthentication");
    // console.log(req);
    const {Authorization} = req.body.headers;
    console.log("Auth - "+Authorization);
    if(!Authorization){
        res.status(401).json({error: "User not logged in"});
    }
    const token = Authorization.replace("Bearer ", ""); 
    jwt.verify(token, secretKey, (error, payload)=>{
        if(error){
            console.log("error1");
            return res.status(401).json({error: "User not logged in"});
        }
        const {_id} = payload;
        USER.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();
        })
        .catch((err)=>{
            console.log("error2 - "+error);
            return res.status(401).json({ error: "User not logged in" });
        })
    })
}

