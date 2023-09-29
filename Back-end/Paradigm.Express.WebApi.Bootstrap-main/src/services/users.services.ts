import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/user";
import validator from "validator";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class UsersServices {
    constructor(private repo: UsersRepository) { }

    async validateUser(user: User): Promise<string | null> {
        if (!user.name || typeof user.name !== 'string') {
            return "Bad format in 'Name' field";
        }

        if (!user.lastName || typeof user.lastName !== 'string') {
            return "Bad format in 'Last name' field";
        }

        if (!user.mail || !validator.isEmail(user.mail)) {
            return "Invalid email";
        }

        if (user.userType !== 0 && user.userType !== 1) {
            return "Invalid User type";
        }

        return null;
    }

}