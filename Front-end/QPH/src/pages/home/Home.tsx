import { useEffect, useState } from "react";
import Carousel from "../../commonComponents/carousel/Carousel";
import styles from './Home.module.css';
import { HomeEvent } from "../../models/home.event";
import axios from "axios";
import { ServerEvent } from "../../models/server.event";
import { EventGrid } from "../../commonComponents/eventGrid/EventGrid";

const Home: React.FC = () => {

    // State to store featured events
    const [featuredEvents, setFeaturedEvents] = useState<HomeEvent[]>([]);

    // State to store other events
    const [events, setEvents] = useState<HomeEvent[]>([]);

    // useEffect to fetch and set featured events
    useEffect(() => {
        async function fetchFeaturedEvents() {
            try {
                const response = await axios.get("http://localhost:5000/api/events/featured");
                let serverEvents: ServerEvent[] = response.data;

                // Limit the number of featured events to display to 3
                serverEvents = serverEvents.slice(0, 3);

                // Map server events to frontend format
                const frontendEvents: HomeEvent[] = serverEvents.map((serverEvent) => ({
                    id: serverEvent.id,
                    title: serverEvent.title,
                    place: serverEvent.place,
                    address: serverEvent.address,
                    date: serverEvent.date,
                    time: serverEvent.time,
                    description: serverEvent.description,
                    userId: serverEvent.userId,
                    image: `event${serverEvent.id}`,
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

    // useEffect to fetch and set other events
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await axios.get("http://localhost:5000/api/events");
                const serverEvents: ServerEvent[] = response.data;

                const frontendEvents: HomeEvent[] = serverEvents.map((serverEvent) => ({
                    id: serverEvent.id,
                    title: serverEvent.title,
                    place: serverEvent.place,
                    address: serverEvent.address,
                    date: serverEvent.date,
                    time: serverEvent.time,
                    description: serverEvent.description,
                    userId: serverEvent.userId,
                    image: `event${serverEvent.id}`,
                    category: serverEvent.category,
                    featured: serverEvent.featured,
                    organizedBy: serverEvent.organizedBy,
                }));

                // Limit the number of events to display to 10
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