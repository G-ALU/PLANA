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
exports.EventController = void 0;
const event_service_1 = require("../Services/event.service");
let EventService = new event_service_1.eventService();
class EventController {
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image } = req.body;
                let result = yield EventService.createEvent(req.body);
                return res.status(201).json(result);
            }
            catch (error) {
                return res.json({
                    error: error
                });
            }
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let event_id = req.params.event_id;
                let { date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image } = req.body;
                let event = {
                    event_id: event_id,
                    date, duration, Location, Ticketsavailable, Singlesprice, Groupsprice, description, image
                };
                let response = yield EventService.updateEvent(event);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: 'Failed to update event details'
                });
            }
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { event_id } = req.params;
                let response = yield EventService.deleteEvent(event_id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: 'Error deleting event'
                });
            }
        });
    }
    fetchAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield EventService.fetchAllEvents();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.json({
                    error
                });
            }
        });
    }
    fetchSingleEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { event_id } = req.params;
                let response = yield EventService.fetchSingleEvent(event_id);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.json({
                    error: 'Error fetching event'
                });
            }
        });
    }
}
exports.EventController = EventController;
