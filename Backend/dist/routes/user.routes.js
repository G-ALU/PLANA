"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controllers/user.controller");
const auth_controller_1 = require("../Controllers/auth.controller");
const user_router = express_1.default.Router();
let controller = new user_controller_1.UserController();
user_router.post('/register', controller.registerUser);
user_router.post('/login', auth_controller_1.loginUser);
user_router.get('/fetch-all-users', controller.getAllUsers);
user_router.get('/fetch-managers', controller.getManagers);
user_router.put('/switch-role', controller.switchRoles);
user_router.get('/getManager/:user_id', controller.getSingleManager);
user_router.get('/:user_id', controller.getSingleUser);
user_router.put('/:email', controller.updateUser);
user_router.put('/updateUser/:user_id', controller.updateUserCredentials);
user_router.put('/deactivate/:user_id', controller.deleteUser);
user_router.put('/reactive/:user_id', controller.reactiveUser);
exports.default = user_router;
