import {TopicActions} from '../commons/TopicActions'
import {callbacks} from './temperatureCallbacks'
import {MqttClient} from 'mqtt'

class TemperatureTopic extends TopicActions{

    private topic: string = 'temperatura'

    publish(broker:MqttClient, message: string){
        return broker.publish(this.topic, message, callbacks.temperaturePublishCallback)
    }
    subscribe(broker:MqttClient){
        broker.on('message', callbacks.temperatureIncomingMessage)
        broker.subscribe(this.topic, callbacks.temperatureSubscribeCallback)
        return broker
    }
    unsubscribe(broker:MqttClient){
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`)
            return broker.unsubscribe(this.topic, callbacks.temperatureUnsubscribeCallback)  //Same callback type from Publish callback     
        }, 1000);
    }
}


export const temperatureTopic = new TemperatureTopic();

