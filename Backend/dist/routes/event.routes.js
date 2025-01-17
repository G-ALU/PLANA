"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../Controllers/event.controller");
const event_router = (0, express_1.Router)();
let controller = new event_controller_1.EventController();
event_router.post('/create', controller.createEvent);
event_router.put('/:event_id', controller.updateEvent);
event_router.delete('/:event_id', controller.deleteEvent);
event_router.get('/all-events', controller.fetchAllEvents);
event_router.get('/:event_id', controller.fetchSingleEvent);
exports.default = event_router;
