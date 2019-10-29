import * as restify from 'restify'
import * as mqtt from 'mqtt'
import * as mongoose from 'mongoose'
import {Router} from '../commons/Router'
import {environment} from '../commons/EnvironmentData'
import { reject } from 'q'

import {temperatureTopic} from '../topics/TemperatureTopic'
import {statusTopic} from '../topics/StatusTopic'

const StatusDisconnectCallback: mqtt.CloseCallback = () => console.log(`Desconectado: ${__filename}`)

class Backend{

    server: restify.Server
    broker: mqtt.MqttClient

    private initBroker2(): mqtt.MqttClient{
        try {
            this.broker = mqtt.connect(environment.broker.url)

            this.broker.on('connect', () => {
                console.log(`Broker conectado: ${this.broker.connected}`)
            })

            return this.broker;

        } catch (error) {
            throw new Error(error)
        }
    }

    private initDb(): Promise<typeof mongoose>{
        console.log(typeof mongoose)
        return mongoose.connect('mongodb://localhost/LoraTopics',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    
    private initBroker(): Promise<mqtt.MqttClient>{
        return new Promise((resolve, reject) => {
            try {
                this.broker = mqtt.connect(environment.broker.url)

                this.broker.on('connect', () => {
                    resolve(this.broker)
                })                    
            } catch (error) {
                reject(error)
            }
    
        })
    }
    
    private initServer(routes: Router[]): Promise<restify.Server>{
        return new Promise((resolve, reject) => {
            try {
                this.server = restify.createServer({
                    name:environment.server.name,
                    version: environment.server.version
                });

                this.server.use(restify.plugins.queryParser());
                this.server.use(restify.plugins.bodyParser());

                for (let route of routes) {
                    route.applyRoutes(this.server)                    
                }

                this.server.listen(environment.server.port, ()=>{
                    resolve(this.server);    
                });

                this.server.on('error', error => console.log(error))
            }
            catch (error) {

                reject(error);

            }
        })
    }

    async exposeServer(routes: Router[]): Promise<any>{
        return this.initDb().then(()=>{
            this.initServer(routes).then(() => this.server)
        })
    }

    async exposeBroker(): Promise<mqtt.MqttClient>{
        return this.initBroker().then(() => this.broker)
    }

    disconnectBroker(forced:boolean): mqtt.MqttClient{
        return this.broker.end(forced, StatusDisconnectCallback)                
    }
}

export const appBackend = new Backend()


