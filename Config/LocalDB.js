const mongoose = require("mongoose");
require("dotenv").config();
// MONGODB_URI = "mongodb://localhost/27017";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection
  .on("open", (stream) => {
    console.log("Conected Locally");
  })
  .once("error", (stream) => {
    console.log("Failed to Connect");
  });
