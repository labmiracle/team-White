import { EventCard } from "../../commonComponents/eventCard/EventCard";
import Nav from "../../commonComponents/nav/Nav";
import { Event } from "../../types";


const testEvent = new Event(
  "Musica",
  "https://source.unsplash.com/random",
  "Festival Bandera",
  "Oct 22",
  "14:00",
  "Hipódromo Rosario",
  "DF Entertainment",
  "www.eventcard.com"
);

const  Home: React.FC  =() => {
    return (
        <>
        <Nav/>

        <EventCard event={testEvent} />
        </>
    );
}

export default Home;