import { CategoryTag } from "./CategoryTag";
import styles from "./styles/EventCard.module.css";
import { EventCardProps } from "../../types";
import event1 from './../../assets/event1.jpg';
import event2 from './../../assets/event2.jpg';
import event3 from './../../assets/event3.jpg';
import { Link } from "react-router-dom";

export function EventCard({ event }: EventCardProps) {

  let imageSource;

  switch (event.image) {
    case 'event1':
      imageSource = event1;
      break;
    case 'event2':
      imageSource = event2;
      break;
    case 'event3':
      imageSource = event3;
      break;
    default:
      imageSource = event1;
      break;
  }

  return (
    <article className={styles.cardContainer}>
      <div className={styles.imageWithTag}>
        <img className={styles.eventImg} src={imageSource} alt="Event image" />
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
          <p className={styles.organizer}>{event.organizedBy}</p>
        </div>
        <div>
          <Link to={`/event/${event.id}`} className={styles.eventLink}>Ir al evento {'>'}</Link>
        </div>
      </div>
    </article>
  );
}