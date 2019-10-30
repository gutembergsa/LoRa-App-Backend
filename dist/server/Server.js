"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mqtt = require("mqtt");
const mongoose = require("mongoose");
const EnvironmentData_1 = require("../commons/EnvironmentData");
const StatusDisconnectCallback = () => console.log(`Desconectado: ${__filename}`);
class Backend {
    initBroker2() {
        try {
            this.broker = mqtt.connect(EnvironmentData_1.environment.broker.url);
            this.broker.on('connect', () => {
                console.log(`Broker conectado: ${this.broker.connected}`);
            });
            return this.broker;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    initDb() {
        return mongoose.connect('mongodb://heroku_900519pp:6ucf4cim2m2qvip1i3oegj3q3m@ds141168.mlab.com:41168/heroku_900519pp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    initBroker() {
        return new Promise((resolve, reject) => {
            try {
                this.broker = mqtt.connect(EnvironmentData_1.environment.broker.url);
                this.broker.on('connect', () => {
                    resolve(this.broker);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    initServer(routes) {
        return new Promise((resolve, reject) => {
            try {
                this.server = restify.createServer({
                    name: EnvironmentData_1.environment.server.name,
                    version: EnvironmentData_1.environment.server.version
                });
                this.server.use(restify.plugins.queryParser());
                this.server.use(restify.plugins.bodyParser());
                for (let route of routes) {
                    route.applyRoutes(this.server);
                }
                this.server.listen(EnvironmentData_1.environment.server.port, () => {
                    resolve(this.server);
                });
                this.server.on('error', error => console.log(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async exposeServer(routes) {
        return this.initDb().then(() => {
            this.initServer(routes).then(() => this.server);
        });
    }
    async exposeBroker() {
        return this.initBroker().then(() => this.broker);
    }
    disconnectBroker(forced) {
        return this.broker.end(forced, StatusDisconnectCallback);
    }
}
exports.appBackend = new Backend();
