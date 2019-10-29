import {TopicActions} from '../commons/TopicActions'
import {MqttClient, ClientSubscribeCallback, PacketCallback, OnMessageCallback, Packet, ISubscriptionGrant, CloseCallback} from 'mqtt'
import { reject } from 'q'

const StatusPublishCallback: PacketCallback = (err: Error, packet: Packet) =>{
    if (err) {
        throw err
    }
    console.log(`Published: ${packet}`)
}

const StatusUnsubscribeCallback: PacketCallback = (err: Error, packet: Packet) =>{
    if (err) {
        throw err
    }
    console.log(`Unsubscribed: ${__filename}`)
}


const StatusSubscribeCallback: ClientSubscribeCallback = (err: Error, granted: ISubscriptionGrant[]) =>{
    if (err) {
        console.log(`Erro: ${err}`)
    }
    console.log(`Subscribed: ${granted[0].topic}`)
}

const StatusIncomingMessage: OnMessageCallback = (topic: string, payload:Buffer, packet:Packet) =>{
    console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`)
}


class StatusTopic extends TopicActions{

    private topic: string = 'status'

    publish(broker:MqttClient, message: string){
        return broker.publish(this.topic, message, StatusPublishCallback)
    }
    subscribe(broker:MqttClient){
        broker.on('message', StatusIncomingMessage)
        return broker.subscribe(this.topic, StatusSubscribeCallback)
    }
    unsubscribe(broker:MqttClient){
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`)
            broker.unsubscribe(this.topic, StatusUnsubscribeCallback)  //Same callback type from Publish callback     
            return broker                
        }, 1000); //timeout to wait for on-fligth packets before stop listen
    }
}
export const statusTopic = new StatusTopic();

