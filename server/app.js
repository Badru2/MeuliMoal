const express = require("express");
const sequelize = require("./config/database");
const Sync = require("./models/Sync");

const postRoutes = require("./router/PostRoutes");
const userRoutes = require("./router/UserRoutes");
const galleryRoutes = require("./router/GalleryRoutes");

const app = express(); // express server
app.use(express.json()); // for parsing application/json

Sync(); // function for get all models

app.use("/api/posts", postRoutes); // routes for posts
app.use("/api/users", userRoutes); // routes for users
app.use("/api/gallery", galleryRoutes); // routes for gallery

// function for run models
sequelize.sync({ alter: true }).then(() => {
  // start server
  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
});
