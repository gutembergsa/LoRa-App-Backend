import 'jest'
import * as request from 'supertest'
import * as mqtt from 'mqtt'
import {environment} from '../commons/EnvironmentData'

let broker:mqtt.MqttClient

test('ping servidor', async ()=>{
    return request('https://mongo-lora-gutem.herokuapp.com')
    .get('/')
    .then(resp => expect(resp.status).toBe(200))
    .catch(fail)
})

test('teste de integridade dos pacotes HTTP', async ()=>{
    return request('https://mongo-lora-gutem.herokuapp.com')
    .get('/temptopic')
    .then(resp =>{
        const data = JSON.parse(resp.text)
        expect(data[data.length - 1]).toHaveProperty('hour')
        expect(data[data.length - 1]).toHaveProperty('date')
        expect(data[data.length - 1]).toHaveProperty('latency')
        expect(data[data.length - 1]).toHaveProperty('value')
    })
    .catch(fail)
})


test('ping broker', ()=> {
    broker = mqtt.connect(environment.broker.url,{
        clientId: 'BackLoraGutem'
    })
    broker.on('connect', () => expect(broker.connected).toBe(true))      
})

afterAll(()=> broker.end(true))