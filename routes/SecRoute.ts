import {Server} from 'restify'
import {Router} from '../commons/Router'
import {statusCollection} from '../models/status.model'


class RatingRoute extends Router{
    applyRoutes(server: Server){
        server.get('/ratingtopic', (req, resp, next)=>{
            statusCollection.find().then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404)
                    return next()
                }
                resp.json(nodeData)
                next()
            })
        })
        server.get('/ratingtopic/:date', (req, resp, next)=>{
            statusCollection.find({
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
        server.del('/ratingtopic/:date', (req, resp, next)=>{
            statusCollection.remove({'date': req.params.date}).exec().then(result => {
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

export const ratingRoute = new RatingRoute();

