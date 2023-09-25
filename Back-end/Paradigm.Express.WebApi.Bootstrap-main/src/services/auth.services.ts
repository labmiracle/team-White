import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { AuthUser } from "../controllers/auth.user";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthServices {
    constructor(private repo: UsersRepository) { }

    async validateUser(authUser: AuthUser): Promise<boolean> {
        const users = await this.repo.find(" mail = ?", [authUser.mail]);

        if (users.length === 1) {
            return await bcrypt.compare(authUser.password, users[0].password);
        } else {
            return false;
        }
    }

    async registerUser(user: User) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await this.repo.insertOne(user);
    }
}