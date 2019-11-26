"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const temperatureSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    latency: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    }
});
exports.temperatureCollection = mongoose.model('temperatureCollection', temperatureSchema);
