"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const celebrate_1 = require("celebrate");
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const server = new http_1.default.Server(app);
app.use(cors_1.default());
app.use(express_1.default.json());
if (!(process.env.NODE_ENV === 'test'))
    mongoose_1.default.connect(`${process.env.DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
app.use(routes_1.default);
app.use(celebrate_1.errors());
exports.default = server;
