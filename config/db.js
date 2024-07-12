const mongoose = require('mongoose');

const connectDb = async  ()=>{
   try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to MongoDB');
   } catch (error) {
    console.log("Something went wrong" ,error);
    process.exit(1);
   }
}

module.exports = connectDb;