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
        let pld = payload.toString().split('|');
        nodePacket.date = `${dateAux.getDate()}-${(dateAux.getMonth() + 1)}-${dateAux.getFullYear()}`;
        nodePacket.hour = `${(dateAux.getHours())}:${dateAux.getMinutes()}`;
        nodePacket.value = pld[0]
        nodePacket.latency = pld[1]
        console.log(`packet: ${nodePacket}`)
        nodePacket.save().then(()=>{
            console.log(`Pub salva: ${topic}`)
        })
    }
}