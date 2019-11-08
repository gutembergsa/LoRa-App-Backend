"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const temperatureSchema = new mongoose.Schema({
    value: {
        type: String
    },
    latency: {
        type: String
    },
    date: {
        type: String,
    },
    hour: {
        type: String,
    }
});
exports.temperatureCollection = mongoose.model('TemperatureTopic', temperatureSchema);
