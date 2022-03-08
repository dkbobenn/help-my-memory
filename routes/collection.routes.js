const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const Card = require("../models/Card.model");
const fileUploader = require("../config/cloudinaryCollec.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
  if (req.file) {
    path = req.file.path;
    console.log(path);
  }
  res.json({ path });
});

//  POST /api/collections  -  Creates a new collection
router.post(
  "/collections",

  (req, res, next) => {
    const { title, imageUrl } = req.body;
    console.log("req body", req.body);

    //create collection:
    Collection.create({ title, imageUrl, cards: [] })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
);

// Retrieves all of the collections:
router.get("/collections", (req, res, next) => {
  Collection.find()
    .populate("cards")
    .then((allCollections) => res.json(allCollections))
    .catch((err) => res.json(err));
});

// Retrieves a specific collection by id:
router.get("/collections/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;
  //console.log("ID is: ", collectionId)

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Collection.findById(collectionId)
    .populate("cards")
    .then((collection) => res.status(200).json(collection))
    .catch((error) => res.json(error));
});

//Updates a specific collection by id:
router.put("/collections/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Collection.findByIdAndUpdate(collectionId, req.body, { new: true })
    .then((updatedCollection) => res.json(updatedCollection))
    .catch((error) => res.json(error));
});

// Deletes a specific Collection by id
router.delete("/collections/:collectionId", (req, res, next) => {
  const { collectionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Collection.findByIdAndRemove(collectionId)
    .then(() =>
      res.json({
        message: `Collection with ${collectionId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
