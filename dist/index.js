"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./lib/db");
const router_1 = __importDefault(require("./routes/router"));
const app = express_1.default();
app.set('view engine', 'ejs');
app.set('views', './Views');
app.use(cookie_parser_1.default());
app.use((req, res, next) => {
    const { token } = req.cookies;
    const decodedToken = jsonwebtoken_1.default.decode(token);
    res.locals.isLoggedIn = decodedToken ? true : false;
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(router_1.default);
// Version 2 ready
db_1.dbConnect(() => {
    app.listen(80);
    console.log('database connected');
});
