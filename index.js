require("dotenv").config();

const express = require("express");
const app = express();

const userRouter = require("./router/user");
const photoRouter = require("./router/photo");
const commentRouter = require("./router/comment");
const socialmediaRouter = require("./router/social-medias");

const port = process.env.PORT || 9490;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/photos", photoRouter);
app.use("/comments", commentRouter);
app.use("/socialmedias", socialmediaRouter);

// app.listen(port)

module.exports = app