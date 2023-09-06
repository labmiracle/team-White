import { DependencyContainer, DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { EditRepositoryBase } from "../core/repositories/edit.repository";
import { Event } from "../models/event";
import { MySqlConnection } from "../core/mysql/mysql.connection";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class EventsRepository extends EditRepositoryBase<Event, number>{
    constructor(dependencyContainer: DependencyContainer, connection: MySqlConnection){
        super(dependencyContainer, connection, Event, "events");
    }
}