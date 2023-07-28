import React, { useState, useEffect } from "react";
import { Event } from "../../types";
import { EventCard } from "../eventCard/EventCard";
import styles from './Carousel.module.css';

export default function Carousel() {
  const events: Event[] = Event.createEventList();
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

  console.log(events.length)

  return (
<>
  <h1 className={styles.sectionTitle}>Los destacados del mes</h1>

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
