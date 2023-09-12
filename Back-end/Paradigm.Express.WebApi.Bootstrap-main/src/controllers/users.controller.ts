import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/user";
import { UsersRepository } from "../repositories/users.repository";
import { InsertionResult } from "../core/repositories/commands/db.command";
import { DELETE, GET, POST, PUT, Path, PathParam } from "typescript-rest";


@Path( "/users" )
@Controller({ route: "/api/users" })
export class UsersController extends ApiController {
    constructor(private repo: UsersRepository) {
        super();
    }

    @GET
    @Action({ route: "/" })
    async get(): Promise<User[]> {
        try {
            return this.repo.find("active = ?", [1]);
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @GET
    @Path(":id")
    @Action({ route: "/:id" })
    async getOne(@PathParam("id") id: number): Promise<User> {
        try {
            return this.repo.getById(id);
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @POST
    @Action({ route: "/", fromBody: true })
    async post(user: User): Promise<User> {
        try {
            const metadata: InsertionResult<number> = await this.repo.insertOne(user);
            user.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return user;
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @PUT
    @Action({ route: "/", method: HttpMethod.PUT, fromBody: true })
    async update(user: User): Promise<User> {
        try {
            this.httpContext.response.sendStatus(200);
            return this.repo.update(user);
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @DELETE
    @Path(":id")
    @Action({ route: "/:id" })
    async delete(@PathParam("id") id: number) {
        try {
            const user = await this.repo.getById(id);
            user.active = 0;
            this.repo.update(user);
            return user;
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
        }
    }

}