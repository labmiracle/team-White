import { Action, ApiController, Controller, HttpContext, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { EventsRepository } from "../repositories/events.repository";
import { Event } from "../models/event";
import { DELETE, GET, POST, PUT, Path, PathParam, Security } from "typescript-rest";
import { Response, Tags } from "typescript-rest-swagger";
import { NewEvent } from "./controllerModels/new.event";
import { EventsServices } from "../services/events.services";

@Path("/api/events")
@Tags("Events")
@Controller({ route: "/api/events" })
export class EventsController extends ApiController {
    constructor(private repo: EventsRepository, private service: EventsServices) {
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
    async getByCategory(@PathParam("category") category: string): Promise<Event[] | undefined> {
        try {
            return this.repo.find(" category = ? AND active = ?", [category, 1]);
        } catch (error) {
            this.httpContext.response.sendStatus(404);
            return;
        }
    }

    @GET
    @Response<string>(404, "Featured events not found")
    @Response<string>(500, "Internal server error")
    @Path("/featured")
    @Action({ route: "/featured", method: HttpMethod.GET })
    async getFeaturedEvents(): Promise<Event[] | undefined> {
        try {
            const events = await this.repo.find(" featured = ? AND active = ?", [1, 1]);
            if (events.length === 0) {
                this.httpContext.response.sendStatus(404);
                return;
            }

            return events;
        } catch {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }

    @Security("x-auth")
    @POST
    @Response<Event>(201, "Event created")
    @Response<string>(500, "Internal server error")
    @Action({ route: "/", fromBody: true })
    async post(newEvent: NewEvent): Promise<Event> {
        try {
            const event = await this.service.insertNewEvent(newEvent);
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
            // falta revisar que el usuario pueda editar solo sus eventos
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
    async delete(@PathParam("id") id: number) {
        try {
            // falta revisar que el usuario pueda borrar solo sus eventos
            const event = await this.repo.getById(id);
            event.active = 0;
            this.repo.update(event);
            return event;
        } catch (error) {
            this.httpContext.response.sendStatus(500);
            return;
        }
    }
}