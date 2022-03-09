const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Collection = require("../models/Collection.model");
const Card = require("../models/Card.model");
const fileUploader = require("../config/cloudinaryCard.config");

const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

// POST "/api/upload" => Route that receives a file, sends it to Cloudinary via the fileUploader and returns the file url
router.post("/fileupload", fileUploader.single("fileUrl"), (req, res, next) => {
  console.log("file is: ", req.file);
  if (req.file) {
    path = req.file.path;
    console.log(path);
  }
  res.json({ path });
});

// Creates a new card
router.post("/cards", (req, res, next) => {
  const {
    title,
    description,
    fileUrl,
    username,
    password,
    cardType,
    collectionId,
  } = req.body;

  //console.log("Password:", password)
  //console.log("Cardtype:", cardType)

  const encryptedString = cryptr.encrypt(password);

  //console.log("Password2:", encryptedString)

  Card.create({
    title,
    description,
    fileUrl,
    username,
    password: encryptedString,
    cardType,
    theCollection: collectionId,
  })
    .then((newCard) => {
      return Collection.findByIdAndUpdate(collectionId, {
        $push: { cards: newCard._id },
      });
    })
    .then((response) => res.json(response))

    .catch((err) => res.json(err));
});

// Retrieves a specific card by id:
router.get("/card/:cardId", (req, res, next) => {
  //console.log("req.params is: ", res);

  const { cardId } = req.params;

  //console.log("ID is: ", cardId);
  // console.log("Password is: ", password);

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Card.findById(cardId)
    //.populate('cards')
    .then((card) => {
      console.log("Card:", card);
      if ((card.cardType = "password")) {
        console.log(card.cardType);
        card.password = cryptr.decrypt(card.password);
        console.log("Card after decryption:", card);
      }
      res.status(200).json(card);
    })
    .catch((error) => res.json(error));
});

//Updates a specific card by id:
router.put("/card/:cardId", (req, res, next) => {
  const { cardId } = req.params;
  //console.log("Edit - req.params:", req.params)

  const encryptedString = cryptr.encrypt(req.body.password);

  console.log("Edit - encryptedString:", encryptedString);

  req.body.password = encryptedString;
  //console.log("Edit - req.body:", req.body)

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Card.findByIdAndUpdate(cardId, req.body, { new: true })
    .then((updatedCard) => res.json(updatedCard))
    .catch((error) => res.json(error));
});

//Deletes a specific card by id
router.delete("/card/:cardId", (req, res, next) => {
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
