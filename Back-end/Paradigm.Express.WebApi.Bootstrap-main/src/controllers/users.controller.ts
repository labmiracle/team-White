import { Action, ApiController, Controller } from "@miracledevs/paradigm-express-webapi";
import { User } from "../models/user";
import { UsersRepository } from "../repositories/users.repository";


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

}