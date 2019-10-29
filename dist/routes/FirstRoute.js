"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("../commons/Router");
const node_model_1 = require("../models/node.model");
class FirstRoute extends Router_1.Router {
    applyRoutes(server) {
        server.get('/first', (req, resp, next) => {
            node_model_1.Node.find().then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404);
                    return next();
                }
                resp.json(nodeData);
                next();
            });
        });
        server.get('/first/:date', (req, resp, next) => {
            node_model_1.Node.find({
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
        server.post('/first', (req, resp, next) => {
            let nodePacket = new node_model_1.Node(req.body);
            let dateAux = new Date();
            nodePacket.date = dateAux.getDate() + "-" + (dateAux.getMonth() + 1) + "-" + dateAux.getFullYear();
            nodePacket.hour = dateAux.getHours() + ":" + (dateAux.getMinutes() + 1);
            nodePacket.save().then(() => {
                resp.send(204);
                next();
            });
        });
        server.del('/first/:date', (req, resp, next) => {
            node_model_1.Node.remove({ 'date': req.params.date }).exec().then(result => {
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
exports.firstRoute = new FirstRoute();
