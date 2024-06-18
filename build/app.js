"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const db_connection_1 = __importDefault(require("./loader/db-connection"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
console.log("cccc");
(0, db_connection_1.default)();
app.use('/users', UserRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
app.use((err, req, res, next) => {
    res.status(500).send('Internal Server Error');
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
