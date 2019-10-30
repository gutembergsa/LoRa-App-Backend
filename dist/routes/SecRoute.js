"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
class SecondtRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/second', (req, resp, next) => {
            resp.json(200, 'get all ok');
            next();
        });
        server.get('/second/:date', (req, resp, next) => {
            resp.json(200, 'get one ok');
            next();
        });
    }
}
exports.secondRoute = new SecondtRoute();
