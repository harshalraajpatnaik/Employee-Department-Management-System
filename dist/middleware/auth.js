"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restAuth = exports.auth = void 0;
const auth = (req, res, next) => {
    if (!res.locals.isLoggedIn) {
        res.redirect('/login');
        return;
    }
    next();
};
exports.auth = auth;
const restAuth = (req, res, next) => {
    if (!res.locals.isLoggedIn) {
        res.status(403).json('Not Authorized');
        return;
    }
    next();
};
exports.restAuth = restAuth;
