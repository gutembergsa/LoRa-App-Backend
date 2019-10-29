"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
class FirstRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/first', (req, resp, next) => {
            resp.json('get first');
            next();
        });
        server.post('/first', (req, resp, next) => {
            resp.json('post first');
            next();
        });
        server.put('/first', (req, resp, next) => {
            resp.json('put first');
            next();
        });
        server.del('/first', (req, resp, next) => {
            resp.json('del first');
            next();
        });
        server.patch('/first', (req, resp, next) => {
            resp.json('patch first');
            next();
        });
    }
}
exports.firstRoute = new FirstRoute();
