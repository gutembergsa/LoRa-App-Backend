import {appServer} from './server/Server'
import {tempRoute} from './routes/FirstRoute'
import {ratingRoute} from './routes/SecRoute'

import {appBroker} from './server/Broker'
import {temperatureTopic} from './topics/TemperatureTopic'
import {statusTopic} from './topics/StatusTopic'



appServer.exposeServer([tempRoute, ratingRoute]).then(() => {
    appBroker.exposeBroker().then(broker => {
        temperatureTopic.subscribe(broker)
        statusTopic.subscribe(broker)
    })
}).catch(erro => console.log(erro))






