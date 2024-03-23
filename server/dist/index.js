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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectToDataBase_js_1 = require("./db/connectToDataBase.js");
const auth_router_js_1 = __importDefault(require("./Routes/auth.router.js"));
const message_router_js_1 = __importDefault(require("./Routes/message.router.js"));
const user_router_js_1 = __importDefault(require("./Routes/user.router.js"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_router_js_1.default);
app.use("/message", message_router_js_1.default);
app.use("/user", user_router_js_1.default);
app.listen(3001, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, connectToDataBase_js_1.connectToMongoBd)();
    console.log("server is running on port 3001");
}));
