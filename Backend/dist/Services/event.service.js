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
exports.eventService = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sql_config_1 = require("../config/sql.config");
const lodash_1 = __importDefault(require("lodash"));
class eventService {
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let eventId = (0, uuid_1.v4)();
            let result = yield (yield pool.request()
                .input('event_id', eventId)
                .input('date', mssql_1.default.VarChar, event.date)
                .input('duration', mssql_1.default.VarChar, event.duration)
                .input('Location', mssql_1.default.VarChar, event.Location)
                .input('Ticketsavailable', mssql_1.default.VarChar, event.Ticketsavailable)
                .input('Singlesprice', mssql_1.default.Float, event.Singlesprice)
                .input('Groupsprice', mssql_1.default.Float, event.Groupsprice)
                .input('description', mssql_1.default.VarChar, event.description)
                .input('image', mssql_1.default.VarChar, event.image)
                .execute('createEvent')).rowsAffected;
            if (result[0] == 1) {
                return {
                    message: 'Event created successfully'
                };
            }
            else {
                return {
                    message: 'Error creating event'
                };
            }
        });
    }
    updateEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let eventExists = (yield pool.request().query(`SELECT * FROM event WHERE event_id = '${event.event_id}'`)).recordset;
            console.log(eventExists);
            if (lodash_1.default.isEmpty(eventExists)) {
                return {
                    error: 'Event not found'
                };
            }
            else {
                let result = (yield pool.request()
                    .input('event_id', eventExists[0].event_id)
                    .input('date', event.date)
                    .input('duration', event.duration)
                    .input('Location', event.Location)
                    .input('Ticketsavailable', event.Ticketsavailable)
                    .input('Singlesprice', event.Singlesprice)
                    .input('Groupsprice', event.Groupsprice)
                    .input('description', event.description)
                    .input('image', event.image)
                    .execute('updateEventDetails')).rowsAffected;
                console.log(result);
                if (result[0] < 1) {
                    return {
                        error: "Unable to update event details"
                    };
                }
                else {
                    return {
                        message: "Event details updated successfully"
                    };
                }
            }
        });
    }
    deleteEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
                let eventExists = (yield pool.request()
                    .input('event_id', mssql_1.default.VarChar, event_id)
                    .query(`SELECT * FROM event WHERE event_id = @event_id`)).recordset;
                if (eventExists.length === 0) {
                    return {
                        error: 'Event not found'
                    };
                }
                yield pool.request()
                    .input('event_id', mssql_1.default.VarChar, event_id)
                    .execute('deleteEvent');
                return {
                    message: 'Removed event successfully'
                };
            }
            catch (error) {
                console.error('SQL error', error);
                throw error;
            }
        });
    }
    fetchAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let result = (yield pool.query(`SELECT * FROM event`)).recordset;
            if (result.length == 0) {
                return {
                    message: 'No events found'
                };
            }
            else {
                return {
                    event: result
                };
            }
        });
    }
    fetchSingleEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlconfig);
            let event = (yield pool.request().input('event_id', mssql_1.default.VarChar, event_id).query(`SELECT * FROM event WHERE event_id = '${event_id}'`)).recordset;
            if (!event[0].event_id) {
                return {
                    error: "Event not found"
                };
            }
            else {
                return {
                    event: event[0]
                };
            }
        });
    }
}
exports.eventService = eventService;
