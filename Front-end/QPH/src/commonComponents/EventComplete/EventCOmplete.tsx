import React from "react";
import styles from "./eventComplete.module.css";
import { HomeEvent } from "../../models/home.event";
import { CategoryTag } from "../eventCard/CategoryTag";
import eventImages from "../eventCard/eventImages";

interface EventCompleteProps {
  event: HomeEvent;
}

// Component for displaying a complete event
const EventComplete: React.FC<EventCompleteProps> = ({ event }) => {


  // Get the image source based on the event's image name
  let imageSource = eventImages[event.image] || eventImages.default;

  return (
    <article className={styles.eventContainer}>
      <div className={styles.imageWithTag}>
        <img className={styles.eventImg} src={imageSource} alt="Event image" />
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
      </div>
    </article>
  );
};

export default EventComplete;
