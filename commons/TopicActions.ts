import * as mqtt from 'mqtt'

export abstract class TopicActions{
    abstract publish(broker: mqtt.MqttClient, message:string, callback?:mqtt.PacketCallback):mqtt.MqttClient
    abstract subscribe(broker: mqtt.MqttClient, callback:mqtt.ClientSubscribeCallback):mqtt.MqttClient
    abstract unsubscribe(broker: mqtt.MqttClient): any
}