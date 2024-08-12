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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const sql_config_1 = require("../config/sql.config");
dotenv_1.default.config();
class AuthService {
    login(logins) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                const request = pool.request();
                request.input('email', mssql_1.default.VarChar, logins.email);
                const result = yield request.execute('loginUser');
                // Log the database result and user input
                console.log('Database Result:', result.recordset);
                console.log('User Input:', logins);
                // If no user is found, return an error message
                if (result.recordset.length < 1) {
                    return {
                        message: 'User not found'
                    };
                }
                const user = result.recordset[0];
                const role = user.role;
                const user_id = user.user_id;
                const isActive = user.isActive;
                console.log(role);
                console.log(user_id);
                console.log('isactive', isActive);
                // Extract the hashed password from the user record
                const hashedPassword = result.recordset[0].password;
                console.log('Hashed Password from DB:', hashedPassword);
                // Compare the provided password with the hashed password
                const passwordMatch = bcrypt_1.default.compareSync(logins.password, hashedPassword);
                console.log('passwordmatch', passwordMatch);
                // If passwords match, generate a JWT token
                if (passwordMatch) {
                    if (!isActive) {
                        return {
                            message: 'Your account is deactivated. Try signing up'
                        };
                    }
                    const _a = result.recordset[0], { email } = _a, rest = __rest(_a, ["email"]);
                    let token = jsonwebtoken_1.default.sign(rest, process.env.SECRET_KEY, {
                        expiresIn: '2h'
                    });
                    return {
                        message: 'Login successful',
                        role,
                        user_id,
                        token
                    };
                }
                else {
                    // If passwords don't match, return an error message
                    return {
                        message: 'Incorrect password'
                    };
                }
            }
            catch (error) {
                console.error('Server error during login:', error);
                return {
                    message: 'Server error',
                    error
                };
            }
        });
    }
}
exports.AuthService = AuthService;
