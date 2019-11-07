"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbacks = {
    StatusPublishCallback: (err, packet) => {
        if (err) {
            throw err;
        }
        console.log(`Published: ${packet}`);
    },
    StatusUnsubscribeCallback: (err, packet) => {
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
    StatusIncomingMessage: (topic, payload, packet) => {
        console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`);
    }
};
