import {TopicActions} from '../commons/TopicActions'
import {MqttClient} from 'mqtt'
import {statusCallbacks} from './callbacks/statusCallbacks'

class StatusTopic extends TopicActions{

    private topic: string = 'ratings'

    publish(broker:MqttClient, message: string){
        return broker.publish(this.topic, message, statusCallbacks.StatusPublishCallback)
    }
    subscribe(broker:MqttClient){
        broker.on('message', statusCallbacks.StatusIncomingMessage)
        broker.subscribe(this.topic, statusCallbacks.StatusSubscribeCallback)
        return broker
    }
    unsubscribe(broker:MqttClient){
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`)
            broker.unsubscribe(this.topic, statusCallbacks.StatusUnsubscribeCallback)  //Same callback type from Publish callback     
            return broker                
        }, 1000) //timeout to wait for on-flight packets before stop listen
    }
}
export const statusTopic = new StatusTopic()

