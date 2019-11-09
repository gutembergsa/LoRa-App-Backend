"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TopicActions_1 = require("../commons/TopicActions");
const temperatureCallbacks_1 = require("./callbacks/temperatureCallbacks");
class TemperatureTopic extends TopicActions_1.TopicActions {
    constructor() {
        super(...arguments);
        this.topic = 'temperatura';
    }
    publish(broker, message) {
        return broker.publish(this.topic, message, temperatureCallbacks_1.tempCallbacks.temperaturePublishCallback);
    }
    subscribe(broker) {
        broker.subscribe(this.topic, temperatureCallbacks_1.tempCallbacks.temperatureSubscribeCallback);
        broker.on('message', temperatureCallbacks_1.tempCallbacks.temperatureIncomingMessage);
        return broker;
    }
    unsubscribe(broker) {
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`);
            return broker.unsubscribe(this.topic, temperatureCallbacks_1.tempCallbacks.temperatureUnsubscribeCallback); //Same callback type from Publish callback     
        }, 1000);
    }
}
exports.temperatureTopic = new TemperatureTopic();
