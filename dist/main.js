"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const FirstRoute_1 = require("./routes/FirstRoute");
const SecRoute_1 = require("./routes/SecRoute");
const TemperatureTopic_1 = require("./topics/TemperatureTopic");
const StatusTopic_1 = require("./topics/StatusTopic");
Server_1.appBackend.exposeServer([FirstRoute_1.firstRoute, SecRoute_1.secondRoute]).then(server => {
    console.log(`Servidor conectado`);
    Server_1.appBackend.exposeBroker().then(broker => {
        console.log(`Broker conectado ${broker}`);
        TemperatureTopic_1.temperatureTopic.subscribe(broker);
        StatusTopic_1.statusTopic.subscribe(broker);
    }).catch((erro) => console.log(`erro: ${erro}`));
}).catch((erro) => console.log(`erro: ${erro}`));
