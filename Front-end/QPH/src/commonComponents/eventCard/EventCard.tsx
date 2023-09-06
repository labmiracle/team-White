import { CategoryTag } from "./CategoryTag";
import styles from "./styles/EventCard.module.css";
import { EventCardProps } from "../../types";


// Componente EventCard
export function EventCard({ event }: EventCardProps) {

  return (
    <article className={styles.cardContainer}>
      <div className={styles.imageWithTag}>
        <img className={styles.eventImg} src={event.image} alt="Event image" />
        <div className={styles.tagContainer}>
          <CategoryTag text={event.category} />
        </div>
      </div>
      <div className={styles.topContent}>
        <div>
          <h2 className={styles.title}>{event.title}</h2>
          <p className={styles.place}>{event.place}</p>
        </div>
        <h3 className={styles.date}>{event.date} {event.time}</h3>
      </div>
      <div>
        <hr className={styles.line} />
      </div>
      <div className={styles.bottomContent}>
        <div>
          <p className={styles.organizedBy}>Organizado por</p>
          <p className={styles.organizer}>{event.organizer}</p>
        </div>
        <div>
          <a className={styles.eventLink} href={event.href}>Ir al evento {'>'}</a>
        </div>
      </div>
    </article>
  );
}