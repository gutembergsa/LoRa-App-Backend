import {Packet, ISubscriptionGrant} from 'mqtt'
import {temperatureCollection} from '../../models/temperature.model'

const dateFunc = (date: Date): number  =>{
    console.log(`date.getHours(): ${date.getHours()}`)
    if (date.getHours() >= 0 || date.getHours() <= 2) {
        return -21
    }
    if ( date.getHours() == 3) {
        return 0            
    }
return 3
}

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
            let pld = payload.toString().split('|')
            let nodePacket = new temperatureCollection();
            let dateAux = new Date();
            [nodePacket.date, nodePacket.hour, nodePacket.value, nodePacket.latency] = [`${dateAux.getDate()}-${(dateAux.getMonth() + 1)}-${dateAux.getFullYear()}`, `${(dateAux.getHours() - dateFunc(dateAux))}:${dateAux.getMinutes()}`, pld[0], pld[1]]
            console.log(`packet: ${nodePacket}`)
            nodePacket.save().then(()=>{
                console.log(`Pub salva: ${topic}`)
            })
                
        }
    }
}