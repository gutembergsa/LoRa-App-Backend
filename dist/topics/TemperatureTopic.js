"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TopicActions_1 = require("../commons/TopicActions");
const temperaturePublishCallback = (err, packet) => {
    if (err) {
        console.log(`Erro: ${err}`);
    }
    console.log(`Published: ${packet}`);
};
const temperatureUnsubscribeCallback = (err, packet) => {
    if (err) {
        console.log(`Erro: ${err}`);
    }
    console.log(`Unsubscribed: ${__filename}`);
};
const temperatureSubscribeCallback = (err, granted) => {
    if (err) {
        console.log(`Erro: ${err}`);
    }
    console.log(`Subscribed: ${granted[0].topic}`);
};
const temperatureIncomingMessage = (topic, payload, packet) => {
    console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`);
};
class TemperatureTopic extends TopicActions_1.TopicActions {
    constructor() {
        super(...arguments);
        this.topic = 'temperatura';
    }
    publish(broker, message) {
        return broker.publish(this.topic, message, temperaturePublishCallback);
    }
    subscribe(broker) {
        broker.on('message', temperatureIncomingMessage);
        broker.subscribe(this.topic, temperatureSubscribeCallback);
        return broker;
    }
    unsubscribe(broker) {
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`);
            return broker.unsubscribe(this.topic, temperatureUnsubscribeCallback); //Same callback type from Publish callback     
        }, 1000);
    }
}
exports.temperatureTopic = new TemperatureTopic();
