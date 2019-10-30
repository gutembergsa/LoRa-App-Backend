"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const FirstRoute_1 = require("./routes/FirstRoute");
const TemperatureTopic_1 = require("./topics/TemperatureTopic");
Server_1.appBackend.exposeServer([FirstRoute_1.firstRoute]).then(server => {
    console.log(`Servidor conectado`);
}).catch((erro) => console.log(`erro: ${erro}`));
Server_1.appBackend.exposeBroker().then(broker => {
    console.log(`Broker conectado ${broker}`);
}).catch((erro) => console.log(`erro: ${erro}`));
TemperatureTopic_1.temperatureTopic.subscribe(Server_1.appBackend.broker);
TemperatureTopic_1.temperatureTopic.publish(Server_1.appBackend.broker, '100');
