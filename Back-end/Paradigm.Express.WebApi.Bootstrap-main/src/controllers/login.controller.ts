import { Action, ApiController, ConfigurationBuilder, Controller } from "@miracledevs/paradigm-express-webapi";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { GET, POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { AuthUser } from "./auth.user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UsersRepository } from "../repositories/users.repository";

@Path("/api/login")
@Tags("LogIn")
@Controller({ route: "/api/login" })
export class LogInController extends ApiController {
    config: Configuration;

    constructor(config: ConfigurationBuilder, private repo: UsersRepository) {
        super();
        this.config = config.build(Configuration);
    }

    @POST
    @Action({ route: "/", fromBody: true })
    async post(authUser: AuthUser): Promise<string> {
        try {
            const users = await this.repo.find(" mail = ? AND password = ?", [authUser.mail, authUser.password]);

            if (users.length === 1) {
                return jwt.sign({ mail: users[0].mail }, this.config.jwtSecret);
            }

            this.httpContext.response.sendStatus(401);
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }


}
