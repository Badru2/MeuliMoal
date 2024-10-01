const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/gallery/")); // directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // file name
  },
});

const upload = multer({ storage: storage }); // multer settings

// get all gallery
router.get("/get", async (req, res) => {
  try {
    const gallery = await Gallery.findAll(); // get all gallery
    res.status(200).json({ gallery, message: "Gallery found" }); // response with gallery
  } catch (error) {
    res.status(500).json({ error, message: "Error getting gallery" }); // response with error
  }
});

// create gallery
router.post("/create", upload.single("image"), async (req, res) => {
  const { user_id } = req.body; // get data from client
  const image = req.file; // request file
  const imageName = image.filename; // get filename from image variable

  try {
    // create gallery
    const gallery = await Gallery.create({
      user_id,
      image: imageName,
    });
    res.status(200).json({ gallery, message: "Gallery created" }); // return gallery
  } catch (error) {
    res.status(500).json({ error, message: "Error creating gallery" }); // return error
  }
});

// update specific gallery
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params; // get data from client
  const image = req.file; // request file
  const imageName = image ? image.filename : null; // get filename from image variable, check if file exists

  try {
    const gallery = await Gallery.findOne({ where: { id } }); // find gallery by id and await it

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" }); // handle case when gallery is not found
    }

    // update gallery
    const updatedGallery = await gallery.update({
      image: imageName || gallery.image, // if image is not provided, use old image
    });

    res.status(200).json({ updatedGallery, message: "Gallery updated" }); // return gallery
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Error updating gallery" }); // return error
  }
});

// delete specific gallery
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params; // get data from client
  try {
    const gallery = await Gallery.findOne({ where: { id } }); // find gallery by id
    await gallery.destroy(); // delete gallery

    res.status(200).json({ gallery, message: "Gallery deleted" }); // return gallery
  } catch (error) {
    res.status(500).json({ error, message: "Error deleting gallery" }); // return error
  }
});

module.exports = router;
