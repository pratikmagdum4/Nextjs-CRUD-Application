import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To MongoDB")
    } catch (error) {
        console.log("Error connecting MongoDB ", error)
    }
}

export default connectMongoDB;