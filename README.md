# About The Repo
<p align='center'>
    <img src='https://img.shields.io/badge/-MongoDB-05122A?style=for-the-badge&logo=mongodb' alt='MongoDB'>
    <img src='https://img.shields.io/badge/-Node.js-05122A?style=for-the-badge&logo=node.js' alt='Node.js'>
</p>
This repository contains a Node.js script that connects to a MongoDB database using the Mongoose library. The script exports several functions that perform different actions on the User model, including creating, retrieving, and updating User documents.

## Technologies
- Node.js
- MongoDB
- Mongoose
- nodemon (optional - updates the server automatically when you make changes to the code)

### Setup
Install MongoDB and Node.js on your machine
Clone the repository and navigate to the directory
Install the necessary packages by running `npm install`
Connect the script to your MongoDB database by updating the connection URL in the script
Run the script using `node script.js`
## Approach
The script exports several functions that perform different actions on the User model:

- The createUser function creates a new User document and saves it to the database
- The getUsers function retrieves all the User documents from the database and logs them to the console
- The getUserById function retrieves a User document from the database by its _id and logs it to the console
- The getUserByName function retrieves a User document from the database by its name and logs it to the console
- The doesUserExists function checks whether a User document with a specific name exists in the database, and logs a boolean value ( `{ _id: ... }` or `null`) to the console
- The addBestFriend function updates a User document to add a bestFriend field to the User document
- The getBestFriend function retrieves the bestFriend of a User document by its name and logs it to the console
- The User.js file exports a Mongoose model for a User document, with properties for name, completed, age, bestFriend, hobbies, and address. The userSchema defines the structure and validation rules for the User model. It uses the Mongoose library to define a new Mongoose schema for User document, which includes several fields such as name, completed, age, bestFriend, hobbies, and address. Each field has validation rules that the data must adhere to.