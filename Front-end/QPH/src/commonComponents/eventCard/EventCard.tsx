import { CategoryTag } from "./CategoryTag";
import styles from "./styles/EventCard.module.css";
import { EventCardProps } from "../../types";


// Componente EventCard
export function EventCard( {event}: EventCardProps) {
    return (
      <div className={`${styles.eventCard}`}>

        <div className={styles.imageWithTags}>
          <img src={event.image} alt="Event image" className={styles.image} />
          <div className={styles.tagContainer}>
            <CategoryTag text={event.category} filled={false} />
          </div>
        </div>
  
        <div className={styles.topContent}>
          <div>
            <h2 className={`${styles.title}`}>{event.title}</h2>
            <h3 className={`${styles.place}`}>{event.place}</h3>
          </div>
          <div>
            <h2 className={`${styles.date}`}>{event.date} {event.time}</h2>
          </div>
        </div>
  
        <hr className={styles.line} />
  
        <div className={styles.bottomContent}>
          <div>
            <h5 className={styles.h5}>Organizado por</h5>
            <h3 className={`${styles.organizer}`}>{event.organizer}</h3>
          </div>
          {event.href && (
            <div className={styles.href}>
              <a href={event.href}>Ir al evento {'>'}</a>
            </div>
          )}
        </div>

      </div>
    );
  };