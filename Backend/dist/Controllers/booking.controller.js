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
exports.BookingController = void 0;
const booking_service_1 = require("../Services/booking.service");
const bookingService = new booking_service_1.BookingService();
class BookingController {
    bookEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, event_id } = req.body;
                const result = yield bookingService.bookEvent({
                    user_id, event_id,
                    booking_id: '',
                    booking_date: new Date()
                });
                return res.status(201).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error booking event' });
            }
        });
    }
    getAllBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bookingService.getAllBookings();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error fetching bookings' });
            }
        });
    }
    getBookingsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const result = yield bookingService.getBookingsByUser(user_id);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error fetching user bookings' });
            }
        });
    }
    getBookingsByEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { event_id } = req.params;
                const result = yield bookingService.getBookingsByEvent(event_id);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error fetching event bookings' });
            }
        });
    }
    cancelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { booking_id } = req.body;
                const result = yield bookingService.cancelBooking(booking_id);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error cancelling booking' });
            }
        });
    }
    getTotalRevenue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield bookingService.getTotalRevenue();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error: 'Error fetching total revenue' });
            }
        });
    }
}
exports.BookingController = BookingController;
