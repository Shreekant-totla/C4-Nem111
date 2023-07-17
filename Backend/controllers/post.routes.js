const express= require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {PostMOdel} = require("../model/post.model");
const {authMiddleware} = require("../middlewares/auth.middleware");
require("dotenv").config();

//POST add
postRouter.post("/add", authMiddleware, async (req,res)=>{
    try{
        const newPost = await new PostModel(req.body);
        await newPost.save();
        res.status(200).json({msg: "New Post Created", post: req.body});

    }catch(err){
        res.status(400).json({err: err.message})
    }
});

postRouter.get("/", async(req,res)=>{
    const {userID} = req.body;

const {device = ["PC", "TABLET", "MOBILE"]} = req.query
})