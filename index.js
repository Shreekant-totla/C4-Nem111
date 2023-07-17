const express = require("express");
const app = express();
const {connection} = require("./db");
const {authMiddleware} = require("./middlewares/auth.middleware");
require("dotenv").config();

const cors = require("cors");
const { userRouter} = require("./controllers/user.routes");
const { postRouter} = require("./controllers/post.routes");

app.use(express.json());
app.use(cors());

// app.use("/users" , userRouter);
// app.use("/posts",postRouter);
// app.use("/posts" , authMiddleware);

app.listen(process.env.PORT, async ()=> {
    try {
        await connection;
        console.log(`Server running successfully at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})