import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { POST, Path } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Configuration } from "../configuration/configuration";
import { LoginUser } from "./controllerModels/login.user";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/users.repository";
import { AuthServices } from "../services/auth.services";
import { RegisterUser } from "./controllerModels/register.user";

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

                const userId = await this.service.getUserId(loginUser.mail);

                const token = jwt.sign({ mail: loginUser.mail, id: userId }, this.config.jwtSecret);

                return token;
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
    async register(registerUser: RegisterUser): Promise<void> {
        try {

            const users = await this.repo.find(" mail = ?", [registerUser.mail]);

            if (users.length !== 0) {
                this.httpContext.response.status(409).send("Email already registered");
                return;
            }

            await this.service.registerUser(registerUser);
            this.httpContext.response.sendStatus(201);
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }


}
