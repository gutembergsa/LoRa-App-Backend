"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temperature_model_1 = require("../../models/temperature.model");
exports.tempCallbacks = {
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
        let pld = payload.toString().split('|');
        let nodePacket = new temperature_model_1.temperatureCollection();
        let dateAux = new Date();
        [nodePacket.date, nodePacket.hour, nodePacket.value, nodePacket.latency] = [`${dateAux.getDate()}-${(dateAux.getMonth() + 1)}-${dateAux.getFullYear()}`, `${(dateAux.getUTCHours() - 3)}:${dateAux.getMinutes()}`, pld[0], pld[1]];
        console.log(`packet: ${nodePacket}`);
        nodePacket.save().then(() => {
            console.log(`Pub salva: ${topic}`);
        });
    }
};
