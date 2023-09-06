import { Event } from '../../types';
import { EventCard } from '../eventCard/EventCard';
import styles from './EventGrid.module.css'

export const EventGrid = () => {

    const events: Event[] = Event.createEventList();

    return (
        <div className={styles.eventGrid}>
            {events.map((event, index) => (
                <div key={index}>
                    <EventCard event={event}/>
                </div>
            ))}
        </div>
    );
}