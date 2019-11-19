"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
const status_model_1 = require("../models/status.model");
class RatingRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/ratingtopic', (req, resp, next) => {
            status_model_1.statusCollection.find().then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404);
                    return next();
                }
                resp.json(nodeData);
                next();
            });
        });
        server.get('/ratingtopic/:date', (req, resp, next) => {
            status_model_1.statusCollection.find({
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
        server.del('/ratingtopic/:date', (req, resp, next) => {
            status_model_1.statusCollection.remove({ 'date': req.params.date }).exec().then(result => {
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
exports.ratingRoute = new RatingRoute();
