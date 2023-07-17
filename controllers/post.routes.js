const express= require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PostModel} = require("../model/post.model");
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

postRouter.get('/posts', async (req, res) => {
    try {
      const { device } = req.query;
      const filter = {};
  
      if (device) {
        filter.device = device;
      }
  
      const posts = await PostModel.find(filter);
  
      res.json(posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });


//PATCH
postRouter.patch("/update/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const updated = await PostModel.findByIdAndUpdate(id,req.body);
        res.status(200).json({msg:"Successfully Updated", updatedPost: updated});
    } catch (error) {
        res.status(200).json({err: error.message})
    }
})

//DELETE

postRouter.delete("/delete/:id", async (req,res) =>{
    try {
        const {id} =req.params;
        const deleted = await PostModel.findByIdAndDelete(id);
        res.status(200).json({msg: "Successfully deleted", deletedPost: deleted});
    } catch (error) {
        res.status(200).json({err: error.message})
    }
})

module.exports= {postRouter}
