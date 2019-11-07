"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const statusSchema = new mongoose.Schema({
    sent: {
        type: String
    },
    receive: {
        type: String
    }
});
exports.statusCollection = mongoose.model('Node', statusSchema);
