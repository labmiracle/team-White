import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { HomeEvent } from "../../models/home.event";
import { ServerEvent } from "../../models/server.event";
import { EventGrid } from "../../commonComponents/eventGrid/EventGrid";
import Footer from "../../commonComponents/footer/Footer";
import styles from './myEvents.module.css';

const MyEvents = () => {

  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  if (!token) {
    setError('Tu sesión no está iniciada');
    return;
  }

  const decoded = jwt_decode(token) as { mail: string, id: number, alias: string };

  const id = decoded.id;

  const [events, setEvents] = useState<HomeEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/user/${id}`);
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

        setEvents(frontendEvents);

        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <div>
        <h2 className={styles.myEventsTitle}>Mis eventos</h2>
      </div>
      {error && <div>{error}</div>}
      <EventGrid events={events} />
      <Footer />
    </>
  )
}

export default MyEvents;