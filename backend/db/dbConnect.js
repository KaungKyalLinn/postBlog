const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const dbConnect = asyncHandler( async() => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected : ", conn.connection.host);
  }
  catch (err){
    console.log(err);
    process.exit(1);
  }
})

module.exports = dbConnect;