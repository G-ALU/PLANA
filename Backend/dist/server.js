"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const cors_1 = __importDefault(require("cors"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Middleware
app.use((req, res, next) => {
    // console.log('Middleware hit:', req.method, req.url);
    // console.log('Request URL:', req.url);
    // console.log('Request Headers:', req.headers);
    next();
});
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/users', user_routes_1.default);
app.use('/events', event_routes_1.default);
app.use('/bookings', booking_routes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
});
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
