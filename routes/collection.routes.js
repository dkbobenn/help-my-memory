const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const Card = require("../models/Card.model");
const fileUploader = require("../config/cloudinaryCollec.config");

//  POST /api/collections  -  Creates a new collection
router.post(
  "/collections",
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    const { title, imageUrl, cardType } = req.body;

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
    .populate('cards')
    .then((collection) => res.status(200).json(collection))
    .catch((error) => res.json(error));
});

//Updates a specific collection by id:
router.put("/collections/:collectionId/edit", (req, res, next) => {
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
router.delete("/collections/:collectionId/delete", (req, res, next) => {
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
