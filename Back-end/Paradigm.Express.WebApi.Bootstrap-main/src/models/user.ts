import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { IUser } from "./user.interface";


@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class User implements IUser {
    id: number = 0;
    name: string = "";
    lastName: string = "";
    alias?: string = "";
    mail: string = "";
    password: string = "";
    userType: number = 0;
    active: number = 0;
    role: number = 0;
}