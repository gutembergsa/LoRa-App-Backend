import {Packet, ISubscriptionGrant} from 'mqtt'
import {Node} from '../models/node.model'


export const callbacks = {
    temperaturePublishCallback: (err: Error, packet: Packet) =>{
        if (err) {
            console.log(`Erro: ${err}`)
        }
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
    temperatureIncomingMessage:  (topic: string , payload:Buffer, packet:Packet) =>{
        let nodePacket = new Node()
        let dateAux = new Date()
        nodePacket.date = dateAux.getDate() + "-" + (dateAux.getMonth() + 1) + "-" + dateAux.getFullYear();
        nodePacket.hour = (dateAux.getHours() - 3) + ":" + dateAux.getMinutes();
        nodePacket.value = payload.toString()
        nodePacket.latency = payload.toString()
        nodePacket.save().then(()=>{
            console.log(`Pub salva: ${packet}`)
        })
    }
}