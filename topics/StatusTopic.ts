import {TopicActions} from '../commons/TopicActions'
import {MqttClient} from 'mqtt'
import {callbacks} from './callbacks/statusCallbacks'

class StatusTopic extends TopicActions{

    private topic: string = 'ratings'

    publish(broker:MqttClient, message: string){
        return broker.publish(this.topic, message, callbacks.StatusPublishCallback)
    }
    subscribe(broker:MqttClient){
        broker.on('message', callbacks.StatusIncomingMessage)
        return broker.subscribe(this.topic, callbacks.StatusSubscribeCallback)
    }
    unsubscribe(broker:MqttClient){
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`)
            broker.unsubscribe(this.topic, callbacks.StatusUnsubscribeCallback)  //Same callback type from Publish callback     
            return broker                
        }, 1000) //timeout to wait for on-flight packets before stop listen
    }
}
export const statusTopic = new StatusTopic()

