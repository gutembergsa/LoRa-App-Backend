"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const corsRestify = require("restify-cors-middleware");
const EnvironmentData_1 = require("../commons/EnvironmentData");
class AppServer {
    constructor() {
        this.cors = corsRestify({
            origins: ["*"],
            allowHeaders: ["*"],
            exposeHeaders: ["*"]
        });
    }
    initDb() {
        return mongoose.connect(EnvironmentData_1.environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    initServer(routes) {
        return new Promise((resolve, reject) => {
            try {
                this.server = restify.createServer({
                    name: EnvironmentData_1.environment.server.name,
                    version: EnvironmentData_1.environment.server.version
                });
                this.server.pre(this.cors.preflight);
                this.server.use(this.cors.actual);
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
}
exports.appServer = new AppServer();
