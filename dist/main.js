"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const FirstRoute_1 = require("./routes/FirstRoute");
const SecondRoute_1 = require("./routes/SecondRoute");
const TemperatureTopic_1 = require("./topics/TemperatureTopic");
const StatusTopic_1 = require("./topics/StatusTopic");
Server_1.appBackend.exposeServer([FirstRoute_1.firstRoute, SecondRoute_1.secondRoute]).then(server => {
    console.log(`Servidor conectado`);
}).catch((erro) => console.log(`erro: ${erro}`));
Server_1.appBackend.exposeBroker().then(broker => {
    console.log(`Broker conectado ${broker}`);
}).catch((erro) => console.log(`erro: ${erro}`));
StatusTopic_1.statusTopic.subscribe(Server_1.appBackend.broker);
StatusTopic_1.statusTopic.publish(Server_1.appBackend.broker, 'conectado');
TemperatureTopic_1.temperatureTopic.subscribe(Server_1.appBackend.broker);
TemperatureTopic_1.temperatureTopic.publish(Server_1.appBackend.broker, '100 C°');
TemperatureTopic_1.temperatureTopic.publish(Server_1.appBackend.broker, '150 C°');
TemperatureTopic_1.temperatureTopic.publish(Server_1.appBackend.broker, '1000 C°');
