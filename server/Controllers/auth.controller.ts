import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import UserShema from "../Models/user.model.js";


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password: userPass } = req.body;

        if (!username || !email || !userPass) return res.status(400).json({ success: false, message: "missing redantials" });

        const isUserExist = await UserShema.findOne({ email: email });

        if (isUserExist) {
            const isMatch = await compare(userPass, isUserExist.password);

            console.log(isMatch);

            const JWT_Secret = process.env.JWT_SECRET;
            if (!JWT_Secret) {
                throw new Error("The JWT_SECRET is not defined please check check the .env file");
            }
            const token = jwt.sign({ userId: isUserExist._id }, JWT_Secret, { expiresIn: "15d" })
            if (isMatch) {
                const { password, ...rest } = isUserExist.toObject();
                res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 15 });
                res.status(200).json({ success: true, message: "User Already registred", user: rest });
            } else {
                res.status(400).json({ success: false, message: "Email Already Used" });
            }
        } else {
            const salt = await genSalt(10);
            const hashedPassword = await hash(userPass, salt);
            const newUser = new UserShema({
                username: username,
                email: email,
                password: hashedPassword,
            });
            await newUser.save();

            const JWT_Secret = process.env.JWT_SECRET;
            if (!JWT_Secret) {
                throw new Error("The JWT_SECRET is not defined please check check the .env file");
            }
            const token = jwt.sign({ userId: newUser._id }, JWT_Secret, { expiresIn: "15d" });
            const { password, ...rest } = newUser.toObject();
            res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 15 });
            res.status(201).json({ success: true, message: "User Successfully Registered", user: rest });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password: userPass } = req.body;
        if (!email || !userPass) return res.status(400).json({ success: false, message: "Missing Credantials" });
        const user = await UserShema.findOne({ email: email });
        if (!user) return res.status(404).json({ success: false, message: "Invalid Email or Password" });
        const isPasswordMatch = await compare(userPass, user.password);
        if (!isPasswordMatch) return res.status(404).json({ success: false, message: "Invalid Email or Password" });
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) throw new Error("The JWT_SECRET is not available please check the .env file");
        const token = await jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15d" });
        const DEVELOPMENT_MODE = process.env.DEVELOPMENT_MODE;
        if (!DEVELOPMENT_MODE) throw new Error("The DEVELOPMENT_MODE is not available please check the .env file");
        if (DEVELOPMENT_MODE && DEVELOPMENT_MODE === "development") {
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 30 * 24 * 15,
                secure: DEVELOPMENT_MODE === "development" ? false : true,
                httpOnly: true,
                sameSite: "strict",
            });
        } else {
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 30 * 24 * 15,
                secure: DEVELOPMENT_MODE === "development" ? false : true,
                httpOnly: true,
                sameSite: "strict",
            });
        }

        const { password, ...rest } = user.toObject();

        res.status(200).json({ success: true, message: "User Successfully Logged In", user: rest });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server Error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.status(200).cookie("token", null, { maxAge: 0 });
        res.status(200).json({ success: true, message: "Logout Success" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}