import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/user";
import { UsersRepository } from "../repositories/users.repository";
import { InsertionResult } from "../core/repositories/commands/db.command";
import { DELETE, GET, POST, PUT, Path, PathParam, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { AuthFilter } from "../filters/auth.filter";
import { AdminFilter } from "../filters/admin.filter";
import { UsersServices } from "../services/users.services";


@Security("x-auth")
@Path("/api/users")
@Tags("Users")
@Controller({ route: "/api/users", filters: [AdminFilter] })
export class UsersController extends ApiController {
    constructor(private repo: UsersRepository, private service: UsersServices) {
        super();
    }

    @GET
    @Response<string>(500, "Internal server error")
    @Action({ route: "/" })
    async get(): Promise<User[] | undefined> {
        try {
            return this.repo.find("active = ?", [1]);
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @GET
    @Response<string>(404, "User not found")
    @Path(":id")
    @Action({ route: "/:id" })
    async getOne(@PathParam("id") id: number): Promise<User | undefined> {
        try {
            return this.repo.getById(id);
        } catch (error) {
            this.httpContext.response.sendStatus(404);
            return;
        }
    }

    @POST
    @Response<User>(201, "User created")
    @Response<string>(500, "Internal server error")
    @Action({ route: "/", fromBody: true })
    async post(user: User): Promise<User | undefined> {
        try {
            const errorMessage = await this.service.validateUser(user);
            if (!errorMessage) {
                const metadata: InsertionResult<number> = await this.repo.insertOne(user);
                user.id = metadata.insertId;
                this.httpContext.response.sendStatus(201);
                return user;
            }

            this.httpContext.response.status(400).send(errorMessage);
            return;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @PUT
    @Response<User>(200, "User updated correctly")
    @Response<string>(500, "Internal server error")
    @Action({ route: "/", method: HttpMethod.PUT, fromBody: true })
    async update(user: User): Promise<User | undefined> {
        try {
            const errorMessage = await this.service.validateUser(user);
            if (!errorMessage) {
                const existingUser = await this.repo.findByMail(user.mail);

                if (existingUser.length === 0) {
                    this.httpContext.response.status(404).send("User not found");
                    return;
                }

                user.id = existingUser[0].id;

                this.httpContext.response.sendStatus(200);
                return await this.repo.update(user);
            }

            this.httpContext.response.status(400).send(errorMessage);
            return;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @DELETE
    @Response<User>(200, "User deleted correctly")
    @Response<string>(500, "Internal server error")
    @Path(":id")
    @Action({ route: "/:id" })
    async delete(@PathParam("id") id: number): Promise<User | undefined> {
        try {
            const user = await this.repo.getById(id);
            user.active = 0;
            this.repo.update(user);
            return user;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

}