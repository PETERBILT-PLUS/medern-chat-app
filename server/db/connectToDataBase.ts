import { connect } from "mongoose";

export const connectToMongoBd = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error("the MONGO_URI is not available please check the .env file");
    }
    await connect(MONGO_URI);
}