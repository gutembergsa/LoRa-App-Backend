import {Server} from 'restify'

export abstract class Router {

    abstract applyRoutes(server: Server): any
}