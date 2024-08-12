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
exports.BookingService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sql_config_1 = require("../config/sql.config");
const lodash_1 = __importDefault(require("lodash"));
class BookingService {
    bookEvent(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let booking_id = (0, uuid_1.v4)();
                let isBooked = (yield pool.query(`SELECT * FROM bookings WHERE booking_id = '${booking_id}'`)).recordset;
                console.log('Booking id', isBooked[0]);
                if (!lodash_1.default.isEmpty(isBooked)) {
                    return {
                        error: 'Booking already exists'
                    };
                }
                let result = (yield pool.request()
                    .input('booking_id', booking_id)
                    .input('user_id', mssql_1.default.VarChar(255), booking.user_id)
                    .input('event_id', mssql_1.default.VarChar(255), booking.event_id)
                    .execute('bookEvent')).rowsAffected;
                if (result[0] === 0) {
                    return {
                        error: 'Booking not created'
                    };
                }
                else {
                    return {
                        message: 'Booking created successfully'
                    };
                }
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    getAllBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let result = yield pool.request().query('SELECT * FROM bookings');
                return result.recordset;
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    getBookingsByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let result = (yield pool.request()
                    .input('user_id', mssql_1.default.VarChar(255), user_id)
                    .query(`SELECT * FROM bookings WHERE user_id = '${user_id}'`)).recordset;
                console.log(result[0]);
                if (result.length > 0) {
                    return {
                        bookings: result
                    };
                }
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    getBookingsByEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let result = (yield pool.request()
                    .input('event_id', mssql_1.default.VarChar(255), event_id)
                    .query(`SELECT * FROM bookings WHERE event_id = '${event_id}'`)).recordset;
                if (lodash_1.default.isEmpty(result)) {
                    return {
                        error: "No bookings found"
                    };
                }
                else {
                    return {
                        bookings: result
                    };
                }
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    cancelBooking(booking_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let result = yield pool.request()
                    .input('booking_id', mssql_1.default.VarChar(255), booking_id)
                    .execute('cancelBooking');
                const message = (_a = result.recordset[0]) === null || _a === void 0 ? void 0 : _a.message;
                const error = (_b = result.recordset[0]) === null || _b === void 0 ? void 0 : _b.error;
                if (message) {
                    return { message: message };
                }
                else {
                    return { error: error };
                }
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    getTotalRevenue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let result = yield pool.request().execute('gettotalrevenue');
                return { totalRevenue: result.recordset[0].totalRevenue };
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
}
exports.BookingService = BookingService;
