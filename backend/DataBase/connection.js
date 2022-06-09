const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ArjunSingh:EhCymlXmIoRzqhOk@databaseccluster.q75hq.mongodb.net/test"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
