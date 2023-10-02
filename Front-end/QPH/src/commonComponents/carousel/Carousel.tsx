import { useState, useEffect } from "react";
import { EventCard } from "../eventCard/EventCard";
import { HomeEvent } from "../../models/home.event";

export interface CarouselProps {
  events: HomeEvent[];
}

export default function Carousel({ events }: CarouselProps) {

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
