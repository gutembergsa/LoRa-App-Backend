import {Packet, ISubscriptionGrant} from 'mqtt'
import {temperatureCollection} from '../../models/temperature.model'

export const tempCallbacks = {
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
        if (topic === 'temperatura') {
            let pld = payload.toString().split('.')
            let pld2 = pld[1].split('!')
            let nodePacket = new temperatureCollection();
            let dateAux = new Date();
            [nodePacket.date, nodePacket.hour, nodePacket.value, nodePacket.latency] = [`${dateAux.getDate()}-${(dateAux.getMonth() + 1)}-${dateAux.getFullYear()}`, pld2[0], pld[0], pld2[1]]
            console.log(`Sending packet: ${nodePacket}`)
            nodePacket.save().then(()=>{
                console.log(`Pub salva: ${topic}`)
            })     
        }
    }
}
