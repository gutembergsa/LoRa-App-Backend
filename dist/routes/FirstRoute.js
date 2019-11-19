"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
const temperature_model_1 = require("../models/temperature.model");
class FirstRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/temptopic', (req, resp, next) => {
            temperature_model_1.temperatureCollection.find().then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404);
                    return next();
                }
                resp.json(nodeData);
                next();
            });
        });
        server.get('/temptopic/:date', (req, resp, next) => {
            temperature_model_1.temperatureCollection.find({
                'date': req.params.date
            })
                .then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404);
                    return next();
                }
                resp.json(nodeData);
                next();
            });
        });
        server.del('/temptopic/:date', (req, resp, next) => {
            temperature_model_1.temperatureCollection.remove({ 'date': req.params.date }).exec().then(result => {
                if (result.deletedCount) {
                    resp.send(204);
                    next();
                }
                resp.json(404, `erro`);
                return next();
            });
        });
    }
}
exports.tempRoute = new FirstRoute();
