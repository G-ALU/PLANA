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
exports.userService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const sql_config_1 = require("../config/sql.config");
class userService {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let user_id = (0, uuid_1.v4)();
            let hashedPassword = bcrypt_1.default.hashSync(user.password, 6);
            console.log(hashedPassword);
            let emailExist = (yield pool.query(`SELECT * FROM Users WHERE email = '${user.email}'`)).recordset;
            console.log(emailExist[0]);
            if (!lodash_1.default.isEmpty(emailExist)) {
                return {
                    error: "Email already exists",
                };
            }
            console.log("service", user);
            let result = (yield pool
                .request()
                .input("user_id", user_id)
                .input("username", mssql_1.default.VarChar, user.username)
                .input("email", mssql_1.default.VarChar, user.email)
                .input("password", mssql_1.default.VarChar, hashedPassword)
                .execute("registerUser")).rowsAffected;
            console.log(result);
            if (result[0] == 1) {
                return {
                    message: "User registered successfully",
                    user_id,
                };
            }
            else {
                return {
                    error: "User not registered",
                };
            }
        });
    }
    fetchAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let result = (yield pool.query(`SELECT * FROM Users WHERE role = 'user' AND status = 'active'`)).recordset;
            if (result.length == 0) {
                return {
                    message: "No users found"
                };
            }
            else {
                return {
                    users: result
                };
            }
        });
    }
    fetchManagers() {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let result = (yield pool.query(`SELECT * FROM Users WHERE role ='manager' AND status = 'active'`)).recordset;
            if (result.length == 0) {
                return {
                    message: "No managers found"
                };
            }
            else {
                return {
                    managers: result
                };
            }
        });
    }
    fetchSingleUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let user = (yield pool
                .request()
                .input("user_id", mssql_1.default.VarChar, user_id)
                .query(`SELECT * FROM Users WHERE user_id = '${user_id}'`)).recordset;
            if (!user[0].user_id) {
                return {
                    error: "User not found",
                };
            }
            else {
                return {
                    user: user[0],
                };
            }
        });
    }
    fetchsinglemanager(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let user = (yield pool
                .request()
                .input("user_id", mssql_1.default.VarChar, user_id)
                .query(`SELECT * FROM Users WHERE role = 'manager' AND user_id = '${user_id}'`)).recordset;
            if (!user[0].user_id) {
                return {
                    error: "Manager not found",
                };
            }
            else {
                return {
                    user: user[0],
                };
            }
        });
    }
    switchRoles(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.fetchSingleUser(user_id);
            if (response.user.user_id) {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let response = yield (yield pool
                    .request()
                    .input("user_id", mssql_1.default.VarChar, user_id)
                    .query(`UPDATE Users SET role = 'user' WHERE role = 'manager' AND user_id = '${user_id}'`)).rowsAffected;
                console.log(user_id);
                if (response[0] < 1) {
                    return {
                        error: "Unable to changed user role",
                    };
                }
                else {
                    return {
                        message: "User role changed successfully",
                    };
                }
            }
            else {
                return {
                    error: "User not found",
                };
            }
        });
    }
    updateUserDetails(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let user_password = bcrypt_1.default.hashSync(password, 6);
            console.log(user_password);
            let emailExist = (yield pool.request().query(`SELECT * FROM Users WHERE email = '${email}'`)).recordset;
            if (lodash_1.default.isEmpty(emailExist)) {
                return {
                    error: "Email doesn't exists",
                };
            }
            else {
                let result = (yield pool
                    .request()
                    .input("email", emailExist[0].email)
                    .input("password", user_password)
                    .execute("updateUserDetails")).rowsAffected;
                if (result[0] < 1) {
                    return {
                        error: "Unable to update details",
                    };
                }
                else {
                    return {
                        message: "Account Updated successfully",
                        email,
                        user_password,
                    };
                }
            }
        });
    }
    updateUserCredentials(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let user_password = bcrypt_1.default.hashSync(user.password, 6);
            let userExists = yield (yield pool.request().query(`SELECT * FROM Users WHERE user_id ='${user.user_id}'`)).recordset;
            console.log(userExists);
            if (lodash_1.default.isEmpty(userExists)) {
                return {
                    error: 'user not found'
                };
            }
            else {
                let result = (yield pool.request()
                    .input('user_id', userExists[0].user_id)
                    .input('username', user.username)
                    .input('email', user.email)
                    .input('password', user_password)
                    .execute('updateUserCredentials')).rowsAffected;
                console.log(result);
                if (result[0] < 1) {
                    return {
                        error: "Unable to update user details"
                    };
                }
                else {
                    return {
                        message: "User details updated successfully"
                    };
                }
            }
        });
    }
    deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let userExists = (yield pool.request()
                    .input('user_id', mssql_1.default.VarChar, user_id)
                    .query('SELECT * FROM Users WHERE user_id = @user_id')).recordset;
                if (userExists.length === 0) {
                    return {
                        message: 'User not found'
                    };
                }
                yield pool.request()
                    .input('user_id', mssql_1.default.VarChar, user_id)
                    .execute('deleteUser');
                return {
                    message: 'Status updated successfully'
                };
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    reactiveUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let userExists = (yield pool.request()
                    .input('user_id', mssql_1.default.VarChar, user_id)
                    .query('SELECT * FROM Users WHERE user_id = @user_id')).recordset;
                if (userExists.length === 0) {
                    return {
                        message: 'User not found'
                    };
                }
                yield pool.request()
                    .input('user_id', mssql_1.default.VarChar, user_id)
                    .execute('reactiveUser');
                return {
                    message: 'User reactivated successfully'
                };
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
}
exports.userService = userService;
