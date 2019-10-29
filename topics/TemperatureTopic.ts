import {TopicActions} from '../commons/TopicActions'
import {MqttClient, ClientSubscribeCallback, PacketCallback, OnMessageCallback, Packet, ISubscriptionGrant, CloseCallback} from 'mqtt'

const temperaturePublishCallback: PacketCallback = (err: Error, packet: Packet) =>{
    if (err) {
        console.log(`Erro: ${err}`)
    }
    console.log(`Published: ${packet}`)
}

const temperatureUnsubscribeCallback: PacketCallback = (err: Error, packet: Packet) =>{
    if (err) {
        console.log(`Erro: ${err}`)
    }
    console.log(`Unsubscribed: ${__filename}`)
}


const temperatureSubscribeCallback: ClientSubscribeCallback = (err: Error, granted: ISubscriptionGrant[]) =>{
    if (err) {
        console.log(`Erro: ${err}`)
    }
    console.log(`Subscribed: ${granted[0].topic}`)
}

const temperatureIncomingMessage: OnMessageCallback = (topic: string, payload:Buffer, packet:Packet) =>{
    console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`)
}


class TemperatureTopic extends TopicActions{

    private topic: string = 'temperatura'

    publish(broker:MqttClient, message: string){
        return broker.publish(this.topic, message, temperaturePublishCallback)
    }
    subscribe(broker:MqttClient){
        broker.on('message', temperatureIncomingMessage)
        broker.subscribe(this.topic, temperatureSubscribeCallback)
        return broker
    }
    unsubscribe(broker:MqttClient){
        return setTimeout(() => {
            console.log(`topico unsub: ${this.topic}`)
            return broker.unsubscribe(this.topic, temperatureUnsubscribeCallback)  //Same callback type from Publish callback     
        }, 1000);
    }
}


export const temperatureTopic = new TemperatureTopic();

