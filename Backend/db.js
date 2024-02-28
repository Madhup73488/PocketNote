const mongoose = require('mongoose');

// database connection string
const mongoURI = "mongodb://localhost:27017/pocketNote";

// creating a database connection
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// exporting this module to some other modules for the results evaluation
module.exports = connectToMongo;
