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

  // Get JWT token from local storage
  const token = localStorage.getItem("token");

  if (!token) {
    setError('Tu sesión no está iniciada');
    return;
  }

  const decoded = jwt_decode(token) as { mail: string, id: number, alias: string };

  const id = decoded.id;

  const [events, setEvents] = useState<HomeEvent[]>([]);

  useEffect(() => {

    // function that fetches events created by the logged user, using id from parameters
    async function fetchEvents() {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/user/${id}`);
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

        setEvents(frontendEvents);

        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  const deleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth': `${token}`,
        },
      });

    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  };

  return (
    <>
      <div>
        <h2 className={styles.myEventsTitle}>Mis eventos</h2>
      </div>
      {error && <div>{error}</div>}
      <EventGrid events={events} onDelete={deleteEvent} />
      <Footer />
    </>
  )
}

export default MyEvents;