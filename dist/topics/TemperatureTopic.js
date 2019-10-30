"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TopicActions_1 = require("../commons/TopicActions");
const temperatureCallbacks_1 = require("./temperatureCallbacks");
class TemperatureTopic extends TopicActions_1.TopicActions {
    constructor() {
        super(...arguments);
        this.topic = 'temperatura';
    }
    publish(broker, message) {
        return broker.publish(this.topic, message, temperatureCallbacks_1.callbacks.temperaturePublishCallback);
    }
    subscribe(broker) {
        broker.on('message', temperatureCallbacks_1.callbacks.temperatureIncomingMessage);
        broker.subscribe(this.topic, temperatureCallbacks_1.callbacks.temperatureSubscribeCallback);
        return broker;
    }
    unsubscribe(broker) {
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`);
            return broker.unsubscribe(this.topic, temperatureCallbacks_1.callbacks.temperatureUnsubscribeCallback); //Same callback type from Publish callback     
        }, 1000);
    }
}
exports.temperatureTopic = new TemperatureTopic();
