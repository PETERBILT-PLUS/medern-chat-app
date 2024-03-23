import mongoose, { Document } from "mongoose";

export interface User extends Document {
    username: string,
    email: string,
    password: string,
}

const UserShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        requird: true
    }
});

export default mongoose.model<User>("User", UserShema);