const User = require("./User");
const Post = require("./Post");
const Gallery = require("./Gallery");

User.hasMany(Post, { foreignKey: "user_id" }); // one user can have many posts
User.hasMany(Gallery, { foreignKey: "user_id" }); // one user can have many posts
Post.belongsTo(User, { foreignKey: "user_id" }); // one post belongs to one user
Gallery.belongsTo(User, { foreignKey: "user_id" }); // one post belongs to one user

// function for sync models
const Sync = () => {
  User.sync();
  Post.sync();
  Gallery.sync();
};

module.exports = Sync;
