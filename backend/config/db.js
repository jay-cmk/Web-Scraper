const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jayshankary953:fHAzCplWU6Mxa7OP@cluster0.nxdm3nf.mongodb.net/Scraper?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
