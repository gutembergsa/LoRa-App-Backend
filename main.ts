import {appServer} from './server/Server'
import {firstRoute} from './routes/FirstRoute'

import {temperatureTopic} from './topics/TemperatureTopic'
import {statusTopic} from './topics/StatusTopic'

import {appBroker} from './server/Broker'


appServer.exposeServer([firstRoute]).then(() => {
}).catch((erro)=> console.log(`erro: ${erro}`))

appBroker.exposeBroker().then(broker => {
    temperatureTopic.subscribe(broker)
})

appBroker.exposeBroker().then(broker => {
    statusTopic.subscribe(broker)
})



