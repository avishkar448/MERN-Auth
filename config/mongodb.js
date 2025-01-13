import mongoose from "mongoose";

const connectDB= async()=>{ 
    try{ 
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("Successfully connected to mongodb")
    }
    catch(error){ 
        console.log("Failed to connect the Database")
    }
}

export default connectDB;