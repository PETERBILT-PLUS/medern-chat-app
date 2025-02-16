"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("../Controllers/auth.controller.js");
const authRouter = express_1.default.Router();
authRouter.post("/register", auth_controller_js_1.register);
authRouter.post("/login", auth_controller_js_1.login);
authRouter.post("/logout", auth_controller_js_1.logout);
exports.default = authRouter;
