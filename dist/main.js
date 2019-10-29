"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const FirstRoute_1 = require("./routes/FirstRoute");
const SecondRoute_1 = require("./routes/SecondRoute");
Server_1.appBackend.exposeServer([FirstRoute_1.firstRoute, SecondRoute_1.secondRoute]).then(server => {
    console.log(`Servidor conectado`);
}).catch((erro) => console.log(`erro: ${erro}`));
// appBackend.exposeBroker().then(broker => {
//     console.log(`Broker conectado ${broker}`)
// }).catch((erro)=> console.log(`erro: ${erro}`))
