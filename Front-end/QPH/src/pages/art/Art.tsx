import React, { useEffect, useState } from 'react';
import Footer from '../../commonComponents/footer/Footer';
import { EventGrid } from '../../commonComponents/eventGrid/EventGrid';
import styles from './Art.module.css';
import { HomeEvent } from '../../models/home.event';
import axios from 'axios';
import { ServerEvent } from '../../models/server.event';

const Art: React.FC = () => {

  const [events, setEvents] = useState<HomeEvent[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:5000/api/events/category/Arte");
        const serverEvents: ServerEvent[] = response.data;

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
        <h1>Eventos de Arte</h1>
      </div>
      <EventGrid events={events} />
      <Footer />
    </>
  )
}

export default Art;