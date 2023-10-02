import React, { useEffect, useState } from 'react';
import Footer from '../../commonComponents/footer/Footer';
import { EventGrid } from '../../commonComponents/eventGrid/EventGrid';
import styles from './Music.module.css';
import axios from 'axios';
import { HomeEvent } from '../../models/home.event';
import { ServerEvent } from '../../models/server.event';

const Music: React.FC = () => {

  const [events, setEvents] = useState<HomeEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:5000/api/events/category/Música");
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
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <div className={styles.sectionTitle}>
        <h1>Eventos de Música</h1>
      </div>
      <EventGrid events={events} />
      <Footer />
    </>
  )
}

export default Music