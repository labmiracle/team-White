import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { EventsRepository } from "../repositories/events.repository";
import { NewEvent } from "../controllers/controllerModels/new.event";
import { Event } from "../models/event";
import { InsertionResult } from "../core/repositories/commands/db.command";
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repositories/users.repository";
import path from "path";
import fs from 'fs';
import fileUpload, { UploadedFile } from 'express-fileupload';

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class EventsServices {
    constructor(private repo: EventsRepository, private usersRepo: UsersRepository) { }

    async insertNewEvent(newEvent: NewEvent): Promise<Event | null> {
        try {

            if (!newEvent.image) {
                return null;
            }

            const image = newEvent.image as unknown as UploadedFile;

            const dirPath = path.join(__dirname, '..', 'uploads');
            const imagePath = path.join(__dirname, '..', 'uploads', image.name);

            // if 'uploads' folder doesn't exists, create it
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            image.mv(imagePath, (error) => {
                if (error) {
                    console.log('Error al guardar la imagen:', error);
                    throw new Error("Internal server error: error when moving image");
                }
            });

            const event = new Event;

            event.title = newEvent.title;
            event.place = newEvent.place;
            event.address = newEvent.address;
            event.date = newEvent.date;
            event.time = newEvent.time;
            event.description = newEvent.description;
            event.active = 1;
            event.userId = newEvent.userId;
            event.image = imagePath;
            event.category = newEvent.category;
            event.featured = null;

            const metadata: InsertionResult<number> = await this.repo.insertOne(event);
            event.id = metadata.insertId;

            return event;
        } catch {
            throw new Error;
        }
    }

    async validateUserId(token: string, userId: number): Promise<boolean> {
        try {
            const decodedToken = jwt.decode(token) as { mail: string };
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