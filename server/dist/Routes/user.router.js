"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = require("../Controllers/user.controller.js");
const protectRoute_js_1 = require("../middleware/protectRoute.js");
const userRouter = express_1.default.Router();
userRouter.get("/", protectRoute_js_1.protectRoute, user_controller_js_1.getUsersForSideBar);
exports.default = userRouter;
