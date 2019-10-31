"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_model_1 = require("../models/node.model");
exports.callbacks = {
    temperaturePublishCallback: (err, packet) => {
        if (err) {
            console.log(`Erro: ${err}`);
        }
    },
    temperatureUnsubscribeCallback: (err, packet) => {
        if (err) {
            console.log(`Erro: ${err}`);
        }
        console.log(`Unsubscribed: ${__filename}`);
    },
    temperatureSubscribeCallback: (err, granted) => {
        if (err) {
            console.log(`Erro: ${err}`);
        }
        console.log(`Subscribed: ${granted[0].topic}`);
    },
    temperatureIncomingMessage: (topic, payload, packet) => {
        let nodePacket = new node_model_1.Node();
        let dateAux = new Date();
        let pld = payload.toString().split('|');
        nodePacket.date = dateAux.getDate() + "-" + (dateAux.getMonth() + 1) + "-" + dateAux.getFullYear();
        nodePacket.hour = (dateAux.getHours() - 6) + ":" + dateAux.getMinutes();
        nodePacket.value = payload[0].toString();
        nodePacket.latency = payload[1].toString();
        nodePacket.save().then(() => {
            console.log(`Pub salva: ${topic}`);
        });
    }
};
