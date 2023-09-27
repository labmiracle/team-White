import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { LoginUser } from "./login.user";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user";
import { AuthServices } from "../services/auth.services";

@Path("/api/auth")
@Tags("Auth")
@Controller({ route: "/api/auth" })
export class AuthController extends ApiController {
    config: Configuration;

    constructor(config: ConfigurationBuilder, private repo: UsersRepository, private service: AuthServices) {
        super();
        this.config = config.build(Configuration);
    }

    @POST
    @Path("/login")
    @Action({ route: "/login", fromBody: true, method: HttpMethod.POST })
    async login(loginUser: LoginUser): Promise<string | undefined> {
        try {
            const valid = await this.service.validateLoginUser(loginUser);

            if (valid) {
                return jwt.sign({ mail: loginUser.mail }, this.config.jwtSecret);
            }

            this.httpContext.response.sendStatus(401);
        } catch {
            this.httpContext.response.sendStatus(500);

            return;
        }
    }

    @POST
    @Path("/register")
    @Action({ route: "/register", fromBody: true, method: HttpMethod.POST })
    async register(user: User): Promise<void> {
        try {

            const users = await this.repo.find(" mail = ?", [user.mail]);

            if (users.length !== 0) {
                this.httpContext.response.status(409).send("Email already registered");
                return;
            }

            await this.service.registerUser(user);
            this.httpContext.response.sendStatus(201);
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }


}
