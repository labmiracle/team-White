import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { User } from "../models/user";
import { MySqlConnection } from "../core/mysql/mysql.connection";


@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class UsersRepository extends EditRepositoryBase<User, number>{
    constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection) {
        super(dependencyContainer, connection, User, "users");
    }

    async findByMail(mail: string) {
        try {
            return await this.find(" mail = ?", [mail]);
        } catch {
            throw new Error();
        }
    }
}