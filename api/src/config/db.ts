import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "";
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1); 
    }
};


export default connectDB;

