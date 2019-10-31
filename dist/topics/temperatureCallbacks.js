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
        nodePacket.date = dateAux.getDate() + "-" + (dateAux.getMonth() + 1) + "-" + dateAux.getFullYear();
        nodePacket.hour = (dateAux.getHours() - 3) + ":" + dateAux.getMinutes();
        nodePacket.value = payload.toString();
        nodePacket.latency = payload.toString();
        nodePacket.save().then(() => {
            console.log(`Pub salva: ${nodePacket}`);
        });
    }
};
