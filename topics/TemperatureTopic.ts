import {TopicActions} from '../commons/TopicActions'
import {MqttClient} from 'mqtt'
import {tempCallbacks} from './callbacks/temperatureCallbacks'

class TemperatureTopic extends TopicActions{

    private topic: string = 'temperatura'

    publish(broker: MqttClient, message: string){
        return broker.publish(this.topic, message, tempCallbacks.temperaturePublishCallback)
    }
    subscribe(broker: MqttClient){
        broker.subscribe(this.topic, tempCallbacks.temperatureSubscribeCallback)
        broker.on('message', tempCallbacks.temperatureIncomingMessage)
        return broker
    }
    unsubscribe(broker: MqttClient){
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`)
            return broker.unsubscribe(this.topic, tempCallbacks.temperatureUnsubscribeCallback)  //Same callback type from Publish callback     
        }, 1000)
    }
}


export const temperatureTopic = new TemperatureTopic();

