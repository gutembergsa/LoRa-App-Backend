require('newrelic');

import {appBackend} from './server/Server'
import {firstRoute} from './routes/FirstRoute'

import {temperatureTopic} from './topics/TemperatureTopic'
import {statusTopic} from './topics/StatusTopic'

appBackend.exposeServer([firstRoute]).then(() => {
    appBackend.exposeBroker().then(broker => {
        temperatureTopic.subscribe(broker)
        statusTopic.subscribe(broker)
    })
}).catch((erro)=> console.log(`erro: ${erro}`))






