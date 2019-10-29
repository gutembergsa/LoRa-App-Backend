import {Server} from 'restify'
import {Router} from '../commons/Router'

class SecondRoute extends Router{
    applyRoutes(server: Server){
        server.get('/second', (req, resp, next)=>{
            resp.json('get second')
            next()
        })
        server.post('/second', (req, resp, next)=>{
            resp.json('post second')
            next()
        })
        server.put('/second', (req, resp, next)=>{
            resp.json('put second')
            next()
        })
        server.del('/second', (req, resp, next)=>{
            resp.json('del second')
            next()
        })
        server.patch('/second', (req, resp, next)=>{
            resp.json('patch second')
            next()
        })
    }
}

export const secondRoute = new SecondRoute();

