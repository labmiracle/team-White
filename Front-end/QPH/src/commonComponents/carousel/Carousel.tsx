import { useState, useEffect } from "react";
import { EventCard } from "../eventCard/EventCard";
import axios from "axios";
import { HomeEvent } from "../../models/home.event";
import { ServerEvent } from "../../models/server.event";

export default function Carousel() {

  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para cambiar la tarjeta cada 3 segundos
  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [events.length]);

  useEffect(() => {
    async function fetchEvents() {
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

        setEvents(frontendEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              margin: '10px',
              opacity: currentIndex === index ? 1 : 0.5,
              transition: 'opacity 0.5s ease',
            }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </>
  );
}
