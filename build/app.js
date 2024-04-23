"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)(); // New express instance
const port = 9000; // Port number
// Middlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// Start Express server
app.listen(port, () => {
    // Callback function when server is successfully started
    console.log(`Hello from http://localhost:${port}`);
});
app.get('/healthcheck', (req, res) => {
    res.send('I am alive!');
});
// Export Express app
exports.default = app;
