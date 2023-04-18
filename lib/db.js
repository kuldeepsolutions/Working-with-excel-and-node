const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

exports.connectDatabase = async ()=>{
    try {
   const uri = process.env.MONGO_URI;
   const options = {useNewUrlParser:true};
   const conn = await mongoose.connect(uri,options);
   console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline.italic.bgYellow)      
    } catch (error) {
        console.error(error+"".red);
        process.exit(1);
    }
};