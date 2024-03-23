import { Request, Response } from "express";
import UserSchema from "../Models/user.model.js";

export const getUsersForSideBar = async (req: Request, res: Response) => {
    try {
        const loggedUser = req.user?._id;
        const filteredUsers = await UserSchema.find({ _id: { $ne: loggedUser } }).select("-password");
        console.log(filteredUsers);
        res.status(200).json({ success: true, users: filteredUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}