"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
class FirstRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/first', (req, resp, next) => {
            resp.json(200, 'get all ok');
            next();
        });
        server.get('/first/:date', (req, resp, next) => {
            resp.json(200, 'get one ok');
            next();
        });
    }
}
exports.firstRoute = new FirstRoute();
