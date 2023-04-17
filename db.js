const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => console.log("Connected to MongoDB"));
  } catch (error) {
    console.error("Error connecting to MongoDB server:", error);
  }
})();

mongoose.set("strictQuery", false);

module.exports = mongoose.connection;
