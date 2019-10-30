export const environment = {
    server:{
        port: process.env.PORT || 3000,
        version: '1.0',
        name:'LoRa-api'
    },
    broker:{
        url: 'mqtt://test.mosquitto.org'
    }
}