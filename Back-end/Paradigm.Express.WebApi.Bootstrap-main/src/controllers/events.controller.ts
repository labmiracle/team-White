import { Action, ApiController, Controller, HttpContext, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { EventsRepository } from "../repositories/events.repository";
import { Event } from "../models/event";
import { InsertionResult } from "../core/repositories/commands/db.command";
import { DELETE, GET, POST, PUT, Path, PathParam, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";

@Path( "/api/events" )
@Tags("Events")
@Controller({ route: "/api/events" })
export class EventsController extends ApiController {
    constructor(private repo: EventsRepository) {
        super();
    }

    @GET
    @Response<string>(500, "Internal server error")
    @Action({ route: "/" })
    async get(): Promise<Event[]> {
        try {
            return this.repo.find(" active = ?", [1]);
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @GET
    @Response<string>(404, "Event not found")
    @Path(":id")
    @Action({ route: "/:id" })
    async getOne(@PathParam("id") id: number): Promise<Event> {
        try {
            return this.repo.getById(id);
        } catch (error) {
            this.httpContext.response.sendStatus(404);
            return;
        }
    }

    @GET
    @Response<string>(404, "User not found")
    @Path("/user/:id")
    @Action({ route: "/user/:id" })
    async getByUser(@PathParam("id") id: number): Promise<Event[]> {
        try {
            return this.repo.find(" userId = ? AND active = ?", [id, 1]);
        } catch (error) {
            this.httpContext.response.sendStatus(404);
            return;
        }
    }

    @GET
    @Response<string>(404, "Category not found")
    @Path("/category/:category")
    @Action({ route: "/category/:category" })
    async getByCategory(@PathParam("category") category: string): Promise<Event[]> {
        try {
            return this.repo.find(" category = ? AND active = ?", [category, 1]);
        } catch (error) {
            this.httpContext.response.sendStatus(404);
            return;
        }
    }

    @Security("x-auth")
    @POST
    @Response<Event>(201, "Event created")
    @Response<string>(500, "Internal server error")
    @Action({ route: "/", fromBody: true })
    async post(event: Event): Promise<Event> {
        try {
            const metadata: InsertionResult<number> = await this.repo.insertOne(event);
            event.id = metadata.insertId;
            this.httpContext.response.sendStatus(201);
            return event;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Security("x-auth")
    @PUT
    @Response<Event>(200, "Event updated correctly")
    @Response<string>(500, "Internal server error")
    @Action({ route: "/", method: HttpMethod.PUT, fromBody: true })
    async update(event: Event): Promise<Event> {
        try {
            this.httpContext.response.sendStatus(200);
            return this.repo.update(event);
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Security("x-auth")
    @DELETE
    @Response<Event>(200, "Event deleted correctly")
    @Response<string>(500, "Internal server error")
    @Path(":id")
    @Action({ route: "/:id" })
    async delete(@PathParam("id") id: number){
        try{
            const event = await this.repo.getById(id);
            event.active = 0;
            this.repo.update(event);
            return event;
        } catch(error){
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
}