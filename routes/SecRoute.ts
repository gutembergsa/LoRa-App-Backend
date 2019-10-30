import {Server} from 'restify'
import {Router} from '../commons/Router'


class SecondtRoute extends Router{
    applyRoutes(server: Server){
        server.get('/second', (req, resp, next)=>{
                resp.json(200,'get all ok')
                next()
        })
        server.get('/second/:date', (req, resp, next)=>{
            resp.json(200,'get one ok')
            next()
        })
    }
}

export const secondRoute = new SecondtRoute();

