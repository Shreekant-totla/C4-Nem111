const express = require("express");
const {UserModel} = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//Register

userRouter.post("/register", async (req,res) => {
    const {email,password} = req.body;
    try {
        const userExists = await UserModel.findOne({email});
        if(userExists) {
            return res.status(200).json({msg: "Already registered, please login"})
        }
        bcrypt.hash(password, 5, async (err,hash)=> {
            if(err) {
                return res.json({err: err.message})
            }else{
                const newUser = await new UserModel({...req.body, password: hash});
                await newUser.save();
                res
                    .status(200)
                    .json({msg: "User Successfully registered",newUser: req.body});
            }
        })
    } catch (error) {
        res.json({err: error.message})
    }
})

//LOGIn

userRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    try {
        const userExists = await UserModel.findOne({email});
        if(userExists) {
            bcrypt.compare(password,userExists.password, (err,result) => {
                if(result){
                    var token = jwt.sign({userID: userExists._id, user:userExists.name},
                        process.env.JWT_SECRET_KEY,{expiresIn: "5d"});
                        res.status(200).json({msg: "Login Successful",token});
                }else{
                    res.status(200).json({msg: "Wrong credentials"})
                }
            })
        }else{
            res.status(200).json({err: "user does not exist"})
        }
    } catch (error) {
        res.json({err: error.message})
    }
});

module.exports = {userRouter}