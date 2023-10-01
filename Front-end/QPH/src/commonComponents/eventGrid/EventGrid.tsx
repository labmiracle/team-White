import { HomeEvent } from '../../models/home.event';
import { EventCard } from '../eventCard/EventCard';
import styles from './EventGrid.module.css'

export interface EventGridProps {
    events: HomeEvent[];
}

export const EventGrid = ({ events }: EventGridProps) => {

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