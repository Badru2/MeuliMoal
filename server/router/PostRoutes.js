const express = require("express");
const multer = require("multer");
const path = require("path");
const Post = require("../models/Post");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/posts/")); // directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // file name
  },
});

const upload = multer({ storage: storage }); // multer settings

// get all posts
router.get("/get", async (req, res) => {
  try {
    const posts = await Post.findAll(); // get all posts

    res.status(200).json({ posts, message: "Posts found" }); // response with posts
  } catch (error) {
    res.status(500).json({ error, message: "Error getting posts" }); // response with error
  }
});

// get specific post
router.get("/show/:id", async (req, res) => {
  const { id } = req.params; // get id from client

  try {
    const post = await Post.findOne({ where: { id } }); // find post by id

    res.status(200).json({ post, message: "Post found" }); // response with post
  } catch (error) {
    res.status(500).json({ error, message: "Error getting post" }); // response with error
  }
});

// create post
router.post("/create", upload.single("thumbnail"), async (req, res) => {
  const { user_id, title, content } = req.body; // get data from client
  const thumbnail = req.file; // request file
  const thumbnailName = thumbnail.filename; // get filename

  try {
    // create post
    const post = await Post.create({
      user_id,
      title,
      content,
      thumbnail: thumbnailName,
    });

    res.status(200).json({ post, message: "Post created" }); // return post
  } catch (error) {
    res.status(500).json({ error, message: "Error creating post" }); // return error
  }
});

// update specific post
router.put("/update/:id", upload.single("thumbnail"), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body; // get data from client
  const thumbnail = req.file; // request file
  const thumbnailName = thumbnail.filename; // get filename

  try {
    const post = await Post.findOne({ where: { id } }); // find post by id

    // update post
    await post.update({
      title: title || post.title, // if title is not provided, use old title
      content: content || post.content, // if content is not provided, use old content
      thumbnail: thumbnailName || post.thumbnail, // if thumbnail is not provided, use old thumbnail
    });

    res.status(200).json({ post, message: "Post updated" }); // return post
  } catch (error) {
    res.status(500).json({ error, message: "Error updating post" }); // return error
  }
});

// delete specific post
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params; // get data from client
  try {
    const post = await Post.findOne({ where: { id } }); // find post by id
    await post.destroy(); // delete post

    res.status(200).json({ post, message: "Post deleted" }); // return post
  } catch (error) {
    res.status(500).json({ error, message: "Error deleting post" }); // return error
  }
});

module.exports = router; // export router
