import {appBackend} from './server/Server'
import {firstRoute} from './routes/FirstRoute'
import {secondRoute} from './routes/SecRoute'

import {temperatureTopic} from './topics/TemperatureTopic'
import {statusTopic} from './topics/StatusTopic'

appBackend.exposeServer([firstRoute, secondRoute]).then(server => {
    console.log(`Servidor conectado`)
}).catch((erro)=> console.log(`erro: ${erro}`))


appBackend.exposeBroker().then(broker => {
    console.log(`Broker conectado ${broker}`)
    temperatureTopic.subscribe(broker)
    statusTopic.subscribe(broker)
}).catch((erro)=> console.log(`erro: ${erro}`))





