import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { LoginUser } from "../controllers/login.user";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthServices {
    constructor(private repo: UsersRepository) { }

    async validateUser(loginUser: LoginUser): Promise<boolean> {
        const users = await this.repo.find(" mail = ?", [loginUser.mail]);

        if (users.length === 1) {
            return await bcrypt.compare(loginUser.password, users[0].password);
        } else {
            return false;
        }
    }

    async validateAdmin(mail: string): Promise<"isAdmin" | "isNotAdmin" | "notFound"> {
        const users = await this.repo.find(" mail = ?", [mail]);

        if (users.length === 0) {
            return "notFound";
        }

        if (users.length === 1) {
            if (users[0].role === 1) {
                return "isAdmin";
            } else {
                return "isNotAdmin";
            }
        }

        throw new Error();
    }

    async registerUser(user: User) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const insertResponse = await this.repo.insertOne(user);
        console.log(insertResponse);
    }
}