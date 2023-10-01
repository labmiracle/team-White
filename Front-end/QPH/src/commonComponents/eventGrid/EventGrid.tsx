import { HomeEvent } from '../../models/home.event';
import { EventCard } from '../eventCard/EventCard';
import styles from './EventGrid.module.css'

export const EventGrid = (events: HomeEvent[]) => {

    return (
        <div className={styles.eventGrid}>
            {events.map((event, index) => (
                <div key={index}>
                    <EventCard event={event} />
                </div>
            ))}
        </div>
    );
}