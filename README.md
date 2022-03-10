# Help My Memory

## Description of the project

This is an simple and easy app to store all kind of information, you would like to remember. The intention is, that this should be a all in one tool for both passwords and general information.

## Instructions

You need to sign up, and here after you can start creating collections and memory cards for collections. Collections is meant as high level placeholders for a certain topic. Memory cards, which is the chilren of the collections will store the actual information you would like to store in this app.
Collections:
On the collections you upload an image and write a title. The image will be the decoration of your collections card. All images for collections is uploaded to, and hosted on Claudinary.

Cards:
You can create two types of memory cards, one meant for passwords, and one called standard for everything else.
Password Cards: You can input title, description, username and password. The password will be encrypted when stored in the database and decrypted so you can always see it again.
Standard Cards: You can input title, description and upload a file to Claudinary. You can upload any file type you want, and download the file again for viewing.

## Wireframes

https://github.com/dkbobenn/help-my-memory-client/tree/main/public/wireframes.pptx

### Technologies:

- Java Script
- NPM Express
- NPM Moongoose
- NPM Bcrypt
- NPM Cryptr
- NPM Cors

## Models

- User Model: Handling authorization and security
- Collection: Collection data
- Card Model: Data for cards

## Server routes

| Route                      | HTTP   | Description                         |
| -------------------------- | ------ | ----------------------------------- |
| //upload                   | POST   | File upload                         |
| /                          | GET    | Homepage                            |
| /signup                    | GET    | Sign up route                       |
| /signup                    | POST   | Create user                         |
| /login                     | GET    | Login route                         |
| /login                     | POST   | Create JWT token                    |
| /logout                    | POST   | Log out route                       |
| /collections               | GET    | Get all collections                 |
| /collections/:collectionId | GET    | Get a single collection by id       |
| /collections/:collectionId | PUT    | Updates a specific collection by id |
| /collections/:collectionId | DELETE | Deletes a specific Collection by id |
| /cards                     | POST   | Creates a new card                  |
| /card/:cardId              | GET    | Retrieves a specific card by id     |
| /card/:cardId              | PUT    | Updates a specific card by id       |
| /card/:cardId              | DELETE | Deletes a specific card by id       |

### Project Link:

https://github.com/dkbobenn/help-my-memory

## Future work

- Tidy up the code.
- Remove unecessary comments and console.logs
- Link the users to the collections in the database, so you can only see your own collections and cards.

## Resources

- MongoDB
- Mongo Atlas
- Heroku
- Github

## Team

Bo Bennetsen
