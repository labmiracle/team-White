import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/user";
import { UsersRepository } from "../repositories/users.repository";
import { InsertionResult } from "../core/repositories/commands/db.command";
import { DELETE, GET, POST, PUT, Path, PathParam, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { AuthFilter } from "../filters/auth.filter";
import { AdminFilter } from "../filters/admin.filter";


@Security("x-auth")
@Path("/api/users")
@Tags("Users")
@Controller({ route: "/api/users", filters: [AdminFilter] })
export class UsersController extends ApiController {
    constructor(private repo: UsersRepository) {
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
            const metadata: InsertionResult<number> = await this.repo.insertOne(user);
            user.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return user;
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
            this.httpContext.response.sendStatus(200);
            return this.repo.update(user);
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