"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_js_1 = __importDefault(require("../Models/user.model.js"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password: userPass } = req.body;
        if (!username || !email || !userPass)
            return res.status(400).json({ success: false, message: "missing redantials" });
        const isUserExist = yield user_model_js_1.default.findOne({ email: email });
        if (isUserExist) {
            const isMatch = yield (0, bcrypt_1.compare)(userPass, isUserExist.password);
            console.log(isMatch);
            const JWT_Secret = process.env.JWT_SECRET;
            if (!JWT_Secret) {
                throw new Error("The JWT_SECRET is not defined please check check the .env file");
            }
            const token = jsonwebtoken_1.default.sign({ userId: isUserExist._id }, JWT_Secret, { expiresIn: "15d" });
            if (isMatch) {
                const _a = isUserExist.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
                res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 15 });
                res.status(200).json({ success: true, message: "User Already registred", user: rest });
            }
            else {
                res.status(400).json({ success: false, message: "Email Already Used" });
            }
        }
        else {
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const hashedPassword = yield (0, bcrypt_1.hash)(userPass, salt);
            const newUser = new user_model_js_1.default({
                username: username,
                email: email,
                password: hashedPassword,
            });
            yield newUser.save();
            const JWT_Secret = process.env.JWT_SECRET;
            if (!JWT_Secret) {
                throw new Error("The JWT_SECRET is not defined please check check the .env file");
            }
            const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_Secret, { expiresIn: "15d" });
            const _b = newUser.toObject(), { password } = _b, rest = __rest(_b, ["password"]);
            res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 15 });
            res.status(201).json({ success: true, message: "User Successfully Registered", user: rest });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password: userPass } = req.body;
        if (!email || !userPass)
            return res.status(400).json({ success: false, message: "Missing Credantials" });
        const user = yield user_model_js_1.default.findOne({ email: email });
        if (!user)
            return res.status(404).json({ success: false, message: "Invalid Email or Password" });
        const isPasswordMatch = yield (0, bcrypt_1.compare)(userPass, user.password);
        if (!isPasswordMatch)
            return res.status(404).json({ success: false, message: "Invalid Email or Password" });
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET)
            throw new Error("The JWT_SECRET is not available please check the .env file");
        const token = yield jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15d" });
        const DEVELOPMENT_MODE = process.env.DEVELOPMENT_MODE;
        if (!DEVELOPMENT_MODE)
            throw new Error("The DEVELOPMENT_MODE is not available please check the .env file");
        if (DEVELOPMENT_MODE && DEVELOPMENT_MODE === "development") {
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 30 * 24 * 15,
                secure: DEVELOPMENT_MODE === "development" ? false : true,
                httpOnly: true,
                sameSite: "strict",
            });
        }
        else {
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 30 * 24 * 15,
                secure: DEVELOPMENT_MODE === "development" ? false : true,
                httpOnly: true,
                sameSite: "strict",
            });
        }
        const _c = user.toObject(), { password } = _c, rest = __rest(_c, ["password"]);
        res.status(200).json({ success: true, message: "User Successfully Logged In", user: rest });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server Error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).cookie("token", null, { maxAge: 0 });
        res.status(200).json({ success: true, message: "Logout Success" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.logout = logout;
