import { useEffect, useState } from "react";
import Carousel from "../../commonComponents/carousel/Carousel";
import styles from './Home.module.css';
import { HomeEvent } from "../../models/home.event";
import axios from "axios";
import { ServerEvent } from "../../models/server.event";
import { EventGrid } from "../../commonComponents/eventGrid/EventGrid";

const Home: React.FC = () => {

    const [featuredEvents, setFeaturedEvents] = useState<HomeEvent[]>([]);
    const [events, setEvents] = useState<HomeEvent[]>([]);

    useEffect(() => {
        async function fetchFeaturedEvents() {
            try {
                const response = await axios.get("http://localhost:5000/api/events/featured");
                let serverEvents: ServerEvent[] = response.data;
                serverEvents = serverEvents.slice(0, 3);

                const frontendEvents: HomeEvent[] = serverEvents.map((serverEvent, index) => ({
                    id: serverEvent.id,
                    title: serverEvent.title,
                    place: serverEvent.place,
                    address: serverEvent.address,
                    date: serverEvent.date,
                    time: serverEvent.time,
                    description: serverEvent.description,
                    userId: serverEvent.userId,
                    image: `event${index + 1}`,
                    category: serverEvent.category,
                    featured: serverEvent.featured,
                    organizedBy: serverEvent.organizedBy,
                }));

                setFeaturedEvents(frontendEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchFeaturedEvents();
    }, []);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await axios.get("http://localhost:5000/api/events");
                const serverEvents: ServerEvent[] = response.data;

                const frontendEvents: HomeEvent[] = serverEvents.map((serverEvent, index) => ({
                    id: serverEvent.id,
                    title: serverEvent.title,
                    place: serverEvent.place,
                    address: serverEvent.address,
                    date: serverEvent.date,
                    time: serverEvent.time,
                    description: serverEvent.description,
                    userId: serverEvent.userId,
                    image: `event${index + 1}`,
                    category: serverEvent.category,
                    featured: serverEvent.featured,
                    organizedBy: serverEvent.organizedBy,
                }));

                const firstEvents = frontendEvents.slice(0, 10);

                setEvents(firstEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, []);

    return (
        <>
            {/* <Nav /> */}
            <h1 className={styles.sectionTitle}>Los destacados del mes</h1>
            <Carousel events={featuredEvents} />
            <h2 className={styles.sectionSubtitle}>Más eventos</h2>
            <EventGrid events={events} />
            {/* <Footer /> */}
        </>
    );
}

export default Home;