const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
//const PasswordCard = require("../models/PasswordCard.model");
//const StandardCard = require("../models/StandardCard.model");
const fileUploader = require("../config/cloudinary.config");

//  POST /api/collections  -  Creates a new collection
router.post(
  "/collections",
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    const { title, imageUrl } = req.body;

    //console.log(imageUrl)
    //console.log(title)
    //console.log("file is: ", req.file)

    let path = "";

    if (req.file) {
      path = req.file.path;
    }

    //create collection:
    Collection.create({ title, imageUrl: path, cards: [] })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
);

module.exports = router;
