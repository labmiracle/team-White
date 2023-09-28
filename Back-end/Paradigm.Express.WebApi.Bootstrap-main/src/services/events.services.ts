import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { EventsRepository } from "../repositories/events.repository";
import { NewEvent } from "../controllers/controllerModels/new.event";
import { Event } from "../models/event";
import { InsertionResult } from "../core/repositories/commands/db.command";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class EventsServices {
    constructor(private repo: EventsRepository) { }

    async insertNewEvent(newEvent: NewEvent): Promise<Event> {

        const event = new Event;

        event.title = newEvent.title;
        event.place = newEvent.place;
        event.address = newEvent.address;
        event.date = newEvent.date;
        event.time = newEvent.time;
        event.description = newEvent.description;
        event.active = 1;
        event.userId = newEvent.userId;
        event.image = newEvent.image;
        event.category = newEvent.category;
        event.featured = null;

        const metadata: InsertionResult<number> = await this.repo.insertOne(event);
        event.id = metadata.insertId;

        return event;
    }
}