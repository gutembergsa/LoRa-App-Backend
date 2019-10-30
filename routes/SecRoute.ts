import {Server} from 'restify'
import {Router} from '../commons/Router'


class FirstRoute extends Router{
    applyRoutes(server: Server){
        server.get('/first', (req, resp, next)=>{
                resp.json(200,'get all ok')
                next()
        })
        server.get('/first/:date', (req, resp, next)=>{
            resp.json(200,'get one ok')
            next()
        })
    }
}

export const firstRoute = new FirstRoute();

