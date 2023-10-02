import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { EventsRepository } from "../repositories/events.repository";
import { NewEvent } from "../controllers/controllerModels/new.event";
import { Event } from "../models/event";
import { InsertionResult } from "../core/repositories/commands/db.command";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/users.repository";
import path from "path";
import fs from 'fs';
import multer from 'multer';
import { Request } from 'express';

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class EventsServices {

    constructor(private repo: EventsRepository, private usersRepo: UsersRepository) { }

    /*
        function that inserts an event in the database
        it receives a NewEvent object and maps it to a Event object
        so it can be used in the repo
    */
    async insertNewEvent(newEvent: NewEvent): Promise<Event | null> {
        try {

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
            event.organizedBy = newEvent.organizedBy;

            const metadata: InsertionResult<number> = await this.repo.insertOne(event);
            event.id = metadata.insertId;

            return event;
        } catch {
            throw new Error("Error at insertion of event");
        }
    }

    /*
        function that is used when a user is attempting to edit or delete an event
        it validates that the user's id matches the userId field of the event being altered
    */
    async validateUserId(token: string, userId: number): Promise<boolean> {
        try {
            const decodedToken = jwt.decode(token) as { mail: string, id: number };
            const user = await this.usersRepo.findByMail(decodedToken.mail);

            if (user[0].id === userId) {
                return true;
            } else {
                return false;
            }

        } catch {
            throw new Error;
        }
    }
}