"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const swagger_1 = __importDefault(require("./utils/swagger"));
// import swaggerDocs from "./utils/swagger.js";
const server_1 = __importDefault(require("./server"));
// import app from "./server.js";
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 3000;
// connect to DB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    server_1.default.listen(PORT, () => {
        console.log(`listenting on port ${PORT}👂👂 `);
        (0, swagger_1.default)(server_1.default, PORT);
    });
})
    .catch((err) => {
    console.log(err);
});
