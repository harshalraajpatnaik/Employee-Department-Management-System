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
exports.logout = exports.login = exports.deleteEmployee = exports.editEmployee = exports.createEmployee = exports.deleteDepartment = exports.editDepartment = exports.createDepartment = exports.getEditDepartmentPage = exports.creteEmploye = exports.getLoginPage = exports.getEditEmployeePage = exports.getManageDepartment = exports.getHomePage = void 0;
const db_1 = require("../lib/db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const model = require('../model/model');
// console.log(db)
const getHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM depertments ORDER BY name ASC;
    `;
    try {
        yield db_1.client.query(query, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                throw new Error('Error occoured');
            }
            const reqQur = `
            SELECT * FROM Employee ORDER BY firstName ASC;
            `;
            yield db_1.client.query(reqQur, (err, empres) => {
                if (err) {
                    console.log(err);
                    throw new Error('Error occoured');
                }
                res.render('home', {
                    departments: result.rows ? result.rows : [],
                    employees: empres.rows ? empres.rows : []
                });
            });
        }));
    }
    catch (error) {
        return false;
    }
});
exports.getHomePage = getHomePage;
const getManageDepartment = (req, res) => {
    res.render('manageDepartment');
};
exports.getManageDepartment = getManageDepartment;
const getEditEmployeePage = (req, res) => {
    const { firstname, lastname, age, department, id } = req.query;
    res.render('editEmploye', {
        firstname, lastname, age, department, id
    });
};
exports.getEditEmployeePage = getEditEmployeePage;
const getLoginPage = (req, res) => {
    res.render('login');
};
exports.getLoginPage = getLoginPage;
const creteEmploye = (req, res) => {
    res.render('createEmploye');
};
exports.creteEmploye = creteEmploye;
const getEditDepartmentPage = (req, res) => {
    const { id, name } = req.query;
    res.render('editDepartment', {
        id, name
    });
};
exports.getEditDepartmentPage = getEditDepartmentPage;
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const uniqid = Date.now();
    const result = yield model.createDepartment({ name, uniqid });
    if (!result) {
        res.status(500).json('Internal server error');
        return;
    }
    res.json('success');
});
exports.createDepartment = createDepartment;
const editDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    const result = yield model.editDepartment({ name, id });
    if (!result) {
        res.status(500).json('Internal server error');
        return;
    }
    res.json('success');
});
exports.editDepartment = editDepartment;
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const result = yield model.deleteDepartment({ id });
    if (!result) {
        res.status(500).json('Internal server error');
        return;
    }
    res.json('success');
});
exports.deleteDepartment = deleteDepartment;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, age, department } = req.body;
    const uniqid = Date.now();
    const result = yield model.createEmployee({ firstName, lastName, age, department, uniqid });
    if (!result) {
        res.status(500).json('Internal server error');
        return;
    }
    res.json('success');
});
exports.createEmployee = createEmployee;
const editEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstName, lastName, age, department } = req.body;
    const result = yield model.editEmployee({ id, firstName, lastName, age, department });
    if (!result) {
        res.status(500).json('Internal server error');
        return;
    }
    res.json('success');
});
exports.editEmployee = editEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const result = yield model.deleteEmployee({ id });
    if (!result) {
        res.status(500).json('Internal server error');
        return;
    }
    res.json('success');
});
exports.deleteEmployee = deleteEmployee;
// AuthRoutes
const login = (req, res) => {
    const { username, password } = req.body;
    // const hashPassword = bcrypt.hashSync(password, 12)
    const usersPath = path_1.default.join(process.cwd(), 'data', 'users.json');
    const usersData = fs_1.default.readFileSync(usersPath, 'utf-8');
    const data = JSON.parse(usersData);
    const comparePassword = bcrypt_1.default.compareSync(password, data.password);
    if (username != data.username && comparePassword) {
        res.redirect('/login');
        return;
    }
    const token = jwt.sign({
        username
    }, 'mySecret');
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
};
exports.login = login;
const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
exports.logout = logout;
