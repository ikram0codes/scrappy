const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, { dbName: "Scrapper" })
      .then(() => {
        console.log("Database Connected Succesfully!");
      });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
  }
};

module.exports = dbConnect;
