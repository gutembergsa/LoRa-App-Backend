"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const nodeSchema = new mongoose.Schema({
    value: {
        type: Number
    },
    latency: {
        type: Number
    },
    date: {
        type: Date.now()
    }
});
exports.Node = mongoose.model('Node', nodeSchema);
