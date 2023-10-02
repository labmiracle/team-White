import React from "react";
import styles from "./eventComplete.module.css";
import { HomeEvent } from "../../models/home.event";
import { CategoryTag } from "../eventCard/CategoryTag";
import event1 from './../../assets/event1.jpg';

interface EventCompleteProps {
  event: HomeEvent;
}

const EventComplete: React.FC<EventCompleteProps> = ({ event }) => {
  return (
    <article className={styles.eventContainer}>
      <div className={styles.imageWithTag}>
        <img className={styles.eventImg} src={event1} alt="Event image" />
        <div className={styles.tagContainer}>
          <CategoryTag text={event.category} />
        </div>
      </div>
      <div className={styles.topContent}>
        <div>
          <h2 className={styles.title}>{event.title}</h2>
          <p className={styles.place}>{event.place} ({event.address})</p>
        </div>
        <h3 className={styles.date}>{event.date} {event.time}</h3>
      </div>
      <div>
        <p className={styles.description}>{event.description}</p>
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
          <a className={styles.eventLink} href="">Ir al evento {'>'}</a>
        </div>
      </div>
    </article>
  );
};

export default EventComplete;
