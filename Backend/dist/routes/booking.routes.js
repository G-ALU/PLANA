"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../Controllers/booking.controller");
const booking_router = express_1.default.Router();
let bookingController = new booking_controller_1.BookingController();
// Book an event
booking_router.post('/', bookingController.bookEvent);
// Get all bookings
booking_router.get('/', bookingController.getAllBookings);
// Get bookings by user
booking_router.get('/user/:user_id', bookingController.getBookingsByUser);
// Get bookings by event
booking_router.get('/event/:event_id', bookingController.getBookingsByEvent);
// Cancel a booking
booking_router.delete('/', bookingController.cancelBooking);
// Get total revenue
booking_router.get('/book/revenue', bookingController.getTotalRevenue);
exports.default = booking_router;
