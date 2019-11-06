import * as restify from 'restify'
import * as mongoose from 'mongoose'
import * as corsRestify from "restify-cors-middleware";  


import {Router} from '../commons/Router'
import {environment} from '../commons/EnvironmentData'


class AppServer{

    server: restify.Server

    private cors: corsRestify.CorsMiddleware = corsRestify({  
        origins: ["*"],
        allowHeaders: ["*"],
        exposeHeaders: ["*"]
    });

    private initDb(): Promise<typeof mongoose>{
        return mongoose.connect(environment.db.url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    private initServer(routes: Router[]): Promise<restify.Server>{
        return new Promise((resolve, reject) => {
            try {
                this.server = restify.createServer({
                    name:environment.server.name,
                    version: environment.server.version
                });

                this.server.pre(this.cors.preflight);  
                this.server.use(this.cors.actual); 
                this.server.use(restify.plugins.queryParser());
                this.server.use(restify.plugins.bodyParser());
                
                for (let route of routes) {
                    route.applyRoutes(this.server)                    
                }

                this.server.listen(environment.server.port, ()=>{
                    resolve(this.server);    
                });

                this.server.on('error', error => console.log(error))
            }
            catch (error) {

                reject(error);

            }
        })
    }

    async exposeServer(routes: Router[]): Promise<any>{
        return this.initDb().then(()=>{
            this.initServer(routes).then(() => this.server)
        })
    }
}

export const appServer = new AppServer()


