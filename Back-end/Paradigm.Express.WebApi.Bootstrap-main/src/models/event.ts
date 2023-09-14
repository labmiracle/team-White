import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";
import { IEvent } from "./event.interface";

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class Event implements IEvent {
    id: number = 0;
    title: string = '';
    place: string = '';
    address: string = '';
    date: string = '';
    time: string = '';
    description: string = '';
    active: number = 0;
    userId: number = 0;
    image: string = '';
    category: string = '';
}