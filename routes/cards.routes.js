const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const Card = require("../models/Card.model");
const fileUploader = require("../config/cloudinaryCard.config");

// Creates a new card
router.post("/cards", fileUploader.single("fileUrl"), (req, res, next) => {
  const {
    title,
    description,
    fileUrl,
    username,
    password,
    cardType,
    theCollectionId,
  } = req.body;

  let path = "";

  if (req.file) {
    path = req.file.path;
  }

  Card.create({
    title,
    description,
    fileUrl: path,
    username,
    password,
    cardType,
    theCollection: theCollectionId,
  })
    .then((newCard) => {
      return Collection.findByIdAndUpdate(theCollectionId, {
        $push: { cards: newCard._id },
      });
    })
    .then((response) => res.json(response))

    .catch((err) => res.json(err));
});

// Retrieves all of the Cards:
router.get("/cards/:theCollection", (req, res, next) => {
  const collectionId = req.params;
  console.log("ID is: ", collectionId);

  Card.find(collectionId)
    //.populate("cards")
    .then((allCards) => res.json(allCards))
    .catch((err) => res.json(err));
});

// Retrieves a specific card by id:
router.get("/card/:cardId", (req, res, next) => {
  const { cardId } = req.params;
  //console.log("ID is: ", cardId);

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Card.findById(cardId)
    //.populate('cards')
    .then((card) => res.status(200).json(card))
    .catch((error) => res.json(error));
});

//Updates a specific card by id:
router.put("/cards/:cardId", (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Card.findByIdAndUpdate(cardId, req.body, { new: true })
    .then((updatedCard) => res.json(updatedCard))
    .catch((error) => res.json(error));
});

//Deletes a specific card by id
router.delete("/cards/:cardId", (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Card.findByIdAndRemove(cardId)
    .then(() =>
      res.json({
        message: `Card with ${cardId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
