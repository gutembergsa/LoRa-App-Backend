"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TopicActions_1 = require("../commons/TopicActions");
const StatusPublishCallback = (err, packet) => {
    if (err) {
        throw err;
    }
    console.log(`Published: ${packet}`);
};
const StatusUnsubscribeCallback = (err, packet) => {
    if (err) {
        throw err;
    }
    console.log(`Unsubscribed: ${__filename}`);
};
const StatusSubscribeCallback = (err, granted) => {
    if (err) {
        console.log(`Erro: ${err}`);
    }
    console.log(`Subscribed: ${granted[0].topic}`);
};
const StatusIncomingMessage = (topic, payload, packet) => {
    console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`);
};
class StatusTopic extends TopicActions_1.TopicActions {
    constructor() {
        super(...arguments);
        this.topic = 'status';
    }
    publish(broker, message) {
        return broker.publish(this.topic, message, StatusPublishCallback);
    }
    subscribe(broker) {
        broker.on('message', StatusIncomingMessage);
        return broker.subscribe(this.topic, StatusSubscribeCallback);
    }
    unsubscribe(broker) {
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`);
            broker.unsubscribe(this.topic, StatusUnsubscribeCallback); //Same callback type from Publish callback     
            return broker;
        }, 1000); //timeout to wait for on-fligth packets before stop listen
    }
}
exports.statusTopic = new StatusTopic();
