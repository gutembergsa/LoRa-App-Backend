"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = require("mqtt");
const EnvironmentData_1 = require("../commons/EnvironmentData");
process.setMaxListeners(0);
const StatusDisconnectCallback = () => console.log(`Desconectado: ${__filename}`);
class AppBroker {
    initBroker() {
        return new Promise((resolve, reject) => {
            try {
                this.broker = mqtt.connect(EnvironmentData_1.environment.broker.url, {
                    clientId: 'BackLoraGutem'
                });
                this.broker.on('connect', () => {
                    resolve(this.broker);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async exposeBroker() {
        return this.initBroker().then(broker => broker);
    }
    disconnectBroker(forced) {
        return this.broker.end(forced, StatusDisconnectCallback);
    }
}
exports.appBroker = new AppBroker();
