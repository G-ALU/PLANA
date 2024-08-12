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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../Services/user.service");
let UserService = new user_service_1.userService();
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield UserService.registerUser(req.body);
                return res.status(201).json(result);
            }
            catch (error) {
                return res.json({
                    error
                });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield UserService.fetchAllUsers();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.json({
                    error
                });
            }
        });
    }
    getSingleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_id } = req.params;
                let response = yield UserService.fetchSingleUser(user_id);
                console.log(response);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: "Error getting user",
                });
            }
        });
    }
    getSingleManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_id } = req.params;
                let response = yield UserService.fetchsinglemanager(user_id);
                console.log(response);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: "Error getting manager",
                });
            }
        });
    }
    getManagers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield UserService.fetchManagers();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.json({
                    error: "Error fetching managers",
                });
            }
        });
    }
    switchRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_id } = req.body;
                let response = yield UserService.switchRoles(user_id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: "error switching roles",
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.params.email;
                let { password } = req.body;
                let user = {
                    email: email,
                    password,
                };
                let response = yield UserService.updateUserDetails(email, password);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: error,
                });
            }
        });
    }
    updateUserCredentials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_id = req.params.user_id;
                let { username, email, password } = req.body;
                let user = {
                    user_id: user_id,
                    username,
                    email,
                    password
                };
                let response = yield UserService.updateUserCredentials(user);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: error
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_id } = req.params;
                let response = yield UserService.deleteUser(user_id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: 'Error updating status'
                });
            }
        });
    }
    reactiveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user_id } = req.params;
                let response = yield UserService.reactiveUser(user_id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: 'Error updating status'
                });
            }
        });
    }
}
exports.UserController = UserController;
