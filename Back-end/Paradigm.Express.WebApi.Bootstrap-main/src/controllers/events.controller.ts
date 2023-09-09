import { Action, ApiController, Controller, HttpContext, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { EventsRepository } from "../repositories/events.repository";
import { Event } from "../models/event";
import { InsertionResult } from "../core/repositories/commands/db.command";

@Controller({ route: "/api/events" })
export class EventsController extends ApiController {
    constructor(private repo: EventsRepository){
        super();
    }

    @Action({ route: "/" })
    async get(): Promise<Event[]> {
        try{
            return this.repo.getAll();
        } catch(error){
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Action({ route: "/:id" })
    async getOne(id: number): Promise<Event> {
        try{
            return this.repo.getById(id);
        } catch(error){
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Action({ route: "/", fromBody: true })
    async post(event: Event): Promise<Event> {
        try{
            const metadata: InsertionResult<number> = await this.repo.insertOne(event);
            event.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return event;
        }catch(error){
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Action({ route: "/", method: HttpMethod.PUT , fromBody: true })
    async update(event: Event): Promise<Event> {
        try{
            this.httpContext.response.sendStatus(200);
            return this.repo.update(event);
        } catch(error){
            console.log(error);
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
}