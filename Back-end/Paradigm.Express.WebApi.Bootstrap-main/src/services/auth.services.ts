import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { LoginUser } from "../controllers/controllerModels/login.user";
import { RegisterUser } from "../controllers/controllerModels/register.user";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthServices {
    constructor(private repo: UsersRepository) { }

    async validateLoginUser(loginUser: LoginUser): Promise<boolean> {
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

    async registerUser(user: RegisterUser) {
        const newUser = new User;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(user.password, salt);
        newUser.name = user.name;
        newUser.lastName = user.lastName;
        newUser.alias = user.alias;
        newUser.mail = user.mail;
        newUser.userType = user.userType;
        newUser.active = 1;
        newUser.role = 0;

        await this.repo.insertOne(newUser);
    }

    async getUserId(mail: string): Promise<number> {

        const users = await this.repo.find(" mail = ?", [mail]);

        return users[0].id;
    }
}