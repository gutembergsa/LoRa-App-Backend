"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_model_1 = require("../../models/status.model");
exports.statusCallbacks = {
    StatusPublishCallback: (err, packet) => {
        if (err) {
            throw err;
        }
        console.log(`Published: ${packet}`);
    },
    StatusUnsubscribeCallback: (err, _packet) => {
        if (err) {
            throw err;
        }
        console.log(`Unsubscribed: ${__filename}`);
    },
    StatusSubscribeCallback: (err, granted) => {
        if (err) {
            console.log(`Erro: ${err}`);
        }
        console.log(`Subscribed: ${granted[0].topic}`);
    },
    StatusIncomingMessage: (topic, payload, _packet) => {
        if (topic === 'ratings') {
            let pld = payload.toString().split('|');
            let nodePacket = new status_model_1.statusCollection();
            [nodePacket.sent, nodePacket.receive] = [pld[0], pld[1]];
            console.log(`packet: ${nodePacket}`);
            nodePacket.save().then(() => {
                console.log(`Pub salva: ${topic}`);
            });
        }
    }
};
