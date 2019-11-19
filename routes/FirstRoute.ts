import {Server} from 'restify'
import {Router} from '../commons/Router'
import {temperatureCollection} from '../models/temperature.model'


class FirstRoute extends Router{
    applyRoutes(server: Server){
        server.get('/temptopic', (req, resp, next)=>{
            temperatureCollection.find().then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404)
                    return next()
                }
                resp.json(nodeData)
                next()
            })
        })
        server.get('/temptopic/:date', (req, resp, next)=>{
            temperatureCollection.find({
                    'date':req.params.date
                })
                .then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404)
                    return next()
                }
                resp.json(nodeData)
                next()
            })
        })
        server.del('/temptopic/:date', (req, resp, next)=>{
            temperatureCollection.remove({'date': req.params.date}).exec().then(result => {
                if (result.deletedCount) {
                    resp.send(204)
                    next()                    
                }
                resp.json(404, `erro`)
                return next()                    
            })
        })
    }
}

export const tempRoute = new FirstRoute();

