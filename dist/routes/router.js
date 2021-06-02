"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../controllers/controller"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', controller.getHomePage);
router.get('/login', controller.getLoginPage);
router.get('/manageDepartment', auth_1.auth, controller.getManageDepartment);
router.get('/editDepartment', auth_1.auth, controller.getEditDepartmentPage);
router.get('/createEmploye', auth_1.auth, controller.creteEmploye);
router.get('/editEmploye', auth_1.auth, controller.getEditEmployeePage);
// POST Routes
router.post('/createDepartment', auth_1.restAuth, controller.createDepartment);
router.put('/editDepartment', auth_1.restAuth, controller.editDepartment);
router.put('/editEmployee', auth_1.restAuth, controller.editEmployee);
router.delete('/deleteDepartment', auth_1.restAuth, controller.deleteDepartment);
router.delete('/deleteEmployee', auth_1.restAuth, controller.deleteEmployee);
router.post('/createEmployee', auth_1.restAuth, controller.createEmployee);
// Auth Route
router.post('/login', controller.login);
router.get('/logout', controller.logout);
exports.default = router;
