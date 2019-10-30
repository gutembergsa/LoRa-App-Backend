"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbacks = {
    temperaturePublishCallback: (err, packet) => {
        if (err) {
            console.log(`Erro: ${err}`);
        }
        console.log(`Published: ${packet}`);
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
        console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`);
    }
};
