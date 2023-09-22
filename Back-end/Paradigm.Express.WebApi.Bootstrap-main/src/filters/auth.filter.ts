import { Injectable, DependencyLifeTime, DependencyContainer } from "@miracledevs/paradigm-web-di";
import { IFilter, HttpContext, ConfigurationBuilder } from "@miracledevs/paradigm-express-webapi";
import { Configuration } from "../configuration/configuration";
import jwt from "jsonwebtoken";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthFilter implements IFilter {
    config: Configuration;
    
    constructor(config: ConfigurationBuilder) {
        this.config = config.build(Configuration);
    }

    async beforeExecute(httpContext: HttpContext): Promise<void> {
        try {
            const token = httpContext.request.headers['x-auth'] as string;            
            console.log("Credentials: ", token);
            if(!token || !jwt.verify(token, this.config.jwtSecret)){
                httpContext.response.sendStatus(401);
            }
        } catch(error) {
            console.log(error);
            httpContext.response.sendStatus(500);
        }
    }

    async afterExecute(): Promise<void> {}

    async onError(httpContext: HttpContext) {
        console.error("Ups!");
        httpContext.response.status(500).send("Authentication error");
    }
}
