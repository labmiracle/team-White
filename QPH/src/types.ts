export class Event {
    category: string;
    image: string;
    title: string;
    date: string;
    time: string;
    place: string;
    organizer: string;
    href?: string;

    constructor(category:string, image: string, title: string, date: string, time: string, place: string, organizer: string, href?: string){
        this.category = category;
        this.image = image;
        this.title = title;
        this.date = date;
        this.time = time;
        this.place = place;
        this.organizer = organizer;
        this.href = href;
    }
}

export interface EventCardProps {
    event: Event;
}

export interface CategoryTagInterface {
    text: string;
    filled?: boolean;
}