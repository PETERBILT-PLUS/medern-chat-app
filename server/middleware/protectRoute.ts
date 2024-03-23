import { Request, Response, NextFunction } from "express";
import UserSchema, { User } from "../Models/user.model.js"
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Autorized" });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            res.status(500).json({ success: false, message: "Intternal Server Error" });
            throw new Error("The JWT_SECRET is not available please check the .env file");
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Not Autorized" });
        }
        const user = await UserSchema.findById(decoded.userId) as User;
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ succes: false, message: "internal Server Error" });
    }
}