"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const FirstRoute_1 = require("./routes/FirstRoute");
const TemperatureTopic_1 = require("./topics/TemperatureTopic");
const StatusTopic_1 = require("./topics/StatusTopic");
const Broker_1 = require("./server/Broker");
Server_1.appServer.exposeServer([FirstRoute_1.firstRoute]).then(() => {
    Broker_1.appBroker.exposeBroker().then(broker => {
        TemperatureTopic_1.temperatureTopic.subscribe(broker);
        StatusTopic_1.statusTopic.subscribe(broker);
    });
}).catch((erro) => console.log(`erro: ${erro}`));
