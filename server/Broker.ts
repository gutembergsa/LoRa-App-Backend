import * as mqtt from 'mqtt'
import {environment} from '../commons/EnvironmentData'
process.setMaxListeners(0)
const StatusDisconnectCallback: mqtt.CloseCallback = () => console.log(`Desconectado: ${__filename}`)

class AppBroker{

    broker: mqtt.MqttClient
    
    private initBroker(): Promise<mqtt.MqttClient>{
        
        return new Promise((resolve, reject) => {
            try {
                this.broker = mqtt.connect(environment.broker.url,{
                    clientId: 'BackLoraGutem'
                })

                this.broker.on('connect', () => {
                    resolve(this.broker)
                })                    
            } catch (error) {
                reject(error)
            }
    
        })
    }
    

    async exposeBroker(): Promise<mqtt.MqttClient>{
        return this.initBroker().then(broker => {
            // broker.on('message', (topic)=>{
            //     console.log('log broker class ', topic)
            // })
            return broker
        })
    }

    disconnectBroker(forced:boolean): mqtt.MqttClient{
        return this.broker.end(forced, StatusDisconnectCallback)                
    }
}

export const appBroker = new AppBroker()


