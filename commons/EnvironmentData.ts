export const environment = {
    server:{
        port: process.env.PORT || 3000,
        version: '1.0',
        name:'LoRa-api'
    },
    db:{
        url: 'mongodb://heroku_900519pp:6ucf4cim2m2qvip1i3oegj3q3m@ds141168.mlab.com:41168/heroku_900519pp'
    },
    broker:{
        url: 'mqtt://fqqjkyka:JTc0rI7CORXv@tailor-01.cloudmqtt.com:18819'
    }
}