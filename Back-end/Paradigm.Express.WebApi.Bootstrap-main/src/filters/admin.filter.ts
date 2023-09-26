import { Injectable, DependencyLifeTime } from "@miracledevs/paradigm-web-di";
import { IFilter, HttpContext, ConfigurationBuilder } from "@miracledevs/paradigm-express-webapi";
import jwt from "jsonwebtoken";
import { Configuration } from "../configuration/configuration";
import { AuthServices } from "../services/auth.services";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AdminFilter implements IFilter {
    config: Configuration;

    constructor(config: ConfigurationBuilder, private service: AuthServices) {
        this.config = config.build(Configuration);
    }

    async beforeExecute(httpContext: HttpContext): Promise<void | undefined> {
        try {
            const token = httpContext.request.headers["x-auth"] as string;
            if (!token || !jwt.verify(token, this.config.jwtSecret)) {
                httpContext.response.sendStatus(401);
                return;
            }

            const decodedToken = jwt.decode(token) as { mail: string };

            const isAdmin = await this.service.validateAdmin(decodedToken.mail);

            if (isAdmin === "notFound") {
                httpContext.response.status(404).send("User not found");
                return;
            }

            if (isAdmin === "isNotAdmin") {
                httpContext.response.status(401).send("User is not admin");
                return;
            }

        } catch (error) {
            console.error(error);
            httpContext.response.sendStatus(500);
        }
    }

    async onError(httpContext: HttpContext) {
        console.error("Ups!");
        httpContext.response.status(500).send("Admin authentication error");
    }
}
