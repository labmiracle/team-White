import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { GET, POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { AuthUser } from "./auth.user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user";
import { InsertionResult } from "../core/repositories/commands/db.command";

@Path("/api/auth")
@Tags("Auth")
@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
    config: Configuration;

    constructor(config: ConfigurationBuilder, private repo: UsersRepository) {
        super();
        this.config = config.build(Configuration);
    }

    @POST
    @Path("/login")
    @Action({ route: "/login", fromBody: true, method: HttpMethod.POST })
    async login(authUser: AuthUser): Promise<string> {
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

    @POST
    @Path("/register")
    @Action({ route: "/register", fromBody: true })
    async post(user: User){
        try{

            const users = await this.repo.find(" mail = ?", [user.mail]);

            if(users.length !== 0){
                this.httpContext.response.status(409).send("Email already registered");
                return;
            }

            const metadata: InsertionResult<number> = await this.repo.insertOne(user);
            user.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return user;

        } catch{
            this.httpContext.response.sendStatus(500);
            return;
        }
    }


}
