import { Action, ApiController, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/user";
import { UsersRepository } from "../repositories/users.repository";
import { InsertionResult } from "../core/repositories/commands/db.command";


@Controller({ route: "/api/users" })
export class UsersController extends ApiController {
    constructor(private repo: UsersRepository) {
        super();
    }

    @Action({ route: "/" })
    async get(): Promise<User[]> {
        try {
            return this.repo.getAll();
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Action({ route: "/:id" })
    async getOne(id: number): Promise<User> {
        try {
            return this.repo.getById(id);
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Action({ route: "/", fromBody: true })
    async post(user: User): Promise<User>{
        try{
            const metadata: InsertionResult<number> = await this.repo.insertOne(user);
            user.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return user;
        } catch(error){
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Action({ route: "/", method: HttpMethod.PUT , fromBody: true })
    async update(user: User): Promise<User> {
        try{
            this.httpContext.response.sendStatus(200);
            return this.repo.update(user);
        } catch(error){
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

}