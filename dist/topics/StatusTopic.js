"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TopicActions_1 = require("../commons/TopicActions");
const statusCallbacks_1 = require("./callbacks/statusCallbacks");
class StatusTopic extends TopicActions_1.TopicActions {
    constructor() {
        super(...arguments);
        this.topic = 'ratings';
    }
    publish(broker, message) {
        return broker.publish(this.topic, message, statusCallbacks_1.statusCallbacks.StatusPublishCallback);
    }
    subscribe(broker) {
        broker.on('message', statusCallbacks_1.statusCallbacks.StatusIncomingMessage);
        broker.subscribe(this.topic, statusCallbacks_1.statusCallbacks.StatusSubscribeCallback);
        return broker;
    }
    unsubscribe(broker) {
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`);
            broker.unsubscribe(this.topic, statusCallbacks_1.statusCallbacks.StatusUnsubscribeCallback); //Same callback type from Publish callback     
            return broker;
        }, 1000); //timeout to wait for on-flight packets before stop listen
    }
}
exports.statusTopic = new StatusTopic();
