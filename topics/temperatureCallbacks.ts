import {Packet, ISubscriptionGrant} from 'mqtt'
import {Node} from '../models/node.model'


export const callbacks = {
    temperaturePublishCallback: (err: Error, packet: Packet) =>{
        if (err) {
            console.log(`Erro: ${err}`)
        }
        console.log(`Published: ${packet}`)
    },  
    temperatureUnsubscribeCallback:  (err: Error, packet: Packet) =>{
        if (err) {
            console.log(`Erro: ${err}`)
        }
        console.log(`Unsubscribed: ${__filename}`)
    },  
    temperatureSubscribeCallback:  (err: Error, granted: ISubscriptionGrant[]) =>{
        if (err) {
            console.log(`Erro: ${err}`)
        }
        console.log(`Subscribed: ${granted[0].topic}`)
    },
    temperatureIncomingMessage:  (topic: string, payload:Buffer, packet:Packet) =>{
        console.log(`\ntopic: ${topic}\npayload: ${payload}\npacket: ${packet}\n`)
    }
}