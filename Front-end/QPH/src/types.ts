import Muestra from './assets/Muestra.jpg';
import festivalBandera from './assets/festivalBandera.jpg';
import cata from './assets/cata.jpg';

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
          festivalBandera,
          "Festival Bandera",
          "Oct 22",
          "14:00",
          "Hipódromo Rosario",
          "DF Entertainment",
          "www.eventcard.com"
        ),
        new Event(
          "Arte",
          Muestra,
          "Muestra 'Crónicas'",
          "Nov 10",
          "10:30",
          "Museo Castagnino",
          "Secretaría de Cultura"
        ),
        new Event(
          "Gastronomía",
          cata,
          "Vino con calma",
          "Ago 12",
          "21:00",
          "Matria Bar",
          "WineRos"
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
  