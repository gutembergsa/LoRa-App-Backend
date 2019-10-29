import {Server} from 'restify'
import {Router} from '../commons/Router'
import {Node} from '../models/node.model'


class FirstRoute extends Router{
    applyRoutes(server: Server){
        server.get('/first', (req, resp, next)=>{
            Node.find().then(nodeData => {
                if (nodeData.length < 0) {
                    resp.send(404)
                    return next()
                }
                resp.json(nodeData)
                next()
            })
        })
        server.get('/first/:date', (req, resp, next)=>{
            Node.find({
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
        server.post('/first', (req, resp, next)=>{
            let nodePacket = new Node(req.body)
            let dateAux = new Date()
            nodePacket.date = dateAux.getDate() + "-" + (dateAux.getMonth() + 1) + "-" + dateAux.getFullYear();
            nodePacket.hour = dateAux.getHours() + ":" + (dateAux.getMinutes() + 1);
            nodePacket.save().then(()=>{
                resp.send(204)
                next()    
            })
        })

        server.del('/first/:date', (req, resp, next)=>{
            Node.remove({'date': req.params.date}).exec().then(result => {
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

export const firstRoute = new FirstRoute();

