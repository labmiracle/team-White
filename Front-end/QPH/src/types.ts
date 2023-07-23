// Event.ts (or wherever your Event class is defined)
export class Event {
    category: string;
    image: string;
    title: string;
    date: string;
    time: string;
    place: string;
    organizer: string;
    href?: string;
  
    constructor(
      category: string,
      image: string,
      title: string,
      date: string,
      time: string,
      place: string,
      organizer: string,
      href?: string
    ) {
      this.category = category;
      this.image = image;
      this.title = title;
      this.date = date;
      this.time = time;
      this.place = place;
      this.organizer = organizer;
      this.href = href;
    }

    // Method to create a list of events
    static createEventList(): Event[] {
      return [
        new Event(
          "Música",
          "https://source.unsplash.com/random",
          "Festival Bandera",
          "Oct 22",
          "14:00",
          "Hipódromo Rosario",
          "DF Entertainment",
          "www.eventcard.com"
        ),
        new Event(
          "Arte",
          "https://source.unsplash.com/random",
          "Exposición de Arte",
          "Nov 10",
          "10:30",
          "Museo de Bellas Artes",
          "Arte Creativo"
        ),
        new Event(
          "Deportes",
          "https://source.unsplash.com/random",
          "Partido de Fútbol",
          "Oct 15",
          "19:00",
          "Estadio Nacional",
          "Liga Deportiva",
          "www.eventcard.com"
        ),       
      ];

  }}

export interface EventCardProps {
    event: Event;
        }

export interface CategoryTagInterface {
    text: string;
    filled?: boolean;
    }
  