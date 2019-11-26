import 'jest'
import * as request from 'supertest'
import * as mqtt from 'mqtt'
import {environment} from '../commons/EnvironmentData'

let broker:mqtt.MqttClient

test('ping servidor', async ()=>{
    return request('https://mongo-lora-gutem.herokuapp.com')
    .get('/')
    .then(resp =>{
        expect(resp.status).toBe(200)
    })
    .catch(fail)
})

test('teste de integridade dos pacotes HTTP', async ()=>{
    return request('https://mongo-lora-gutem.herokuapp.com')
    .get('/temptopic')
    .then(resp =>{
        expect(resp).toHaveProperty('data')
    })
    .catch(fail)
})


test('ping broker', ()=> {
    broker = mqtt.connect(environment.broker.url,{
        clientId: 'BackLoraGutem'
    })
    broker.on('connect', () => {
        expect(broker.connected).toBe(true)
    })      
})

afterAll(()=>{
    broker.end(true)
})