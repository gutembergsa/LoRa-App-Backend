import {Packet, ISubscriptionGrant} from 'mqtt'
import {statusCollection} from '../../models/status.model'

export const callbacks = {
    StatusPublishCallback:(err: Error, packet: Packet) =>{
        if (err) {
            throw err
        }
        console.log(`Published: ${packet}`)
    },
    
    StatusUnsubscribeCallback:(err: Error, packet: Packet) =>{
        if (err) {
            throw err
        }
        console.log(`Unsubscribed: ${__filename}`)
    },
    
    
    StatusSubscribeCallback:(err: Error, granted: ISubscriptionGrant[]) =>{
        if (err) {
            console.log(`Erro: ${err}`)
        }
        console.log(`Subscribed: ${granted[0].topic}`)
    },
    
    StatusIncomingMessage:(topic: string, payload:Buffer, packet:Packet) =>{
        let pld = payload.toString().split('|')
        let nodePacket = new statusCollection();
        [nodePacket.sent, nodePacket.receive] = [pld[0], pld[1]]
        console.log(`packet: ${nodePacket}`)
        nodePacket.save().then(()=>{
            console.log(`Pub salva: ${topic}`)
        })
    }    
}