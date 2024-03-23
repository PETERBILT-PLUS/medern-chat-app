"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_js_1 = require("../Controllers/message.controller.js");
const protectRoute_js_1 = require("../middleware/protectRoute.js");
const messageRouter = express_1.default.Router();
messageRouter.get("/:id", protectRoute_js_1.protectRoute, message_controller_js_1.getMessages);
messageRouter.post("/send/:id", protectRoute_js_1.protectRoute, message_controller_js_1.sendMessage);
exports.default = messageRouter;
