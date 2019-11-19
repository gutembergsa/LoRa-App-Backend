import {Packet, ISubscriptionGrant} from 'mqtt'
import {statusCollection} from '../../models/status.model'

export const statusCallbacks = {
    StatusPublishCallback:(err: Error, packet: Packet) =>{
        if (err) {
            throw err
        }
        console.log(`Published: ${packet}`)
    },
    StatusUnsubscribeCallback:(err: Error, _packet: Packet) =>{
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
    StatusIncomingMessage:(topic: string, payload:Buffer, _packet:Packet) =>{
        if (topic === 'ratings') {
            console.log(`payload: ${payload.toString()}`)
            let pld = payload.toString().split('|')
            let nodePacket = new statusCollection();
            [nodePacket.receive, nodePacket.sent] = [pld[0], pld[1]]
            console.log(`packet: ${nodePacket}`)
            nodePacket.save().then(()=>{
                console.log(`Pub salva: ${topic}`)
            })                
        }
    }    
}