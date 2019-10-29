"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
class SecondRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/second', (req, resp, next) => {
            resp.json('get second');
            next();
        });
        server.post('/second', (req, resp, next) => {
            resp.json('post second');
            next();
        });
        server.put('/second', (req, resp, next) => {
            resp.json('put second');
            next();
        });
        server.del('/second', (req, resp, next) => {
            resp.json('del second');
            next();
        });
        server.patch('/second', (req, resp, next) => {
            resp.json('patch second');
            next();
        });
    }
}
exports.secondRoute = new SecondRoute();
