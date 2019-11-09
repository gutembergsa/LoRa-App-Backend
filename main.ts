import {appServer} from './server/Server'
import {firstRoute} from './routes/FirstRoute'

import {temperatureTopic} from './topics/TemperatureTopic'
import {statusTopic} from './topics/StatusTopic'

import {appBroker} from './server/Broker'


appServer.exposeServer([firstRoute]).then(() => {
    appBroker.exposeBroker().then(broker => {
        temperatureTopic.subscribe(broker)
        statusTopic.subscribe(broker)
    })
}).catch((erro)=> console.log(erro))






