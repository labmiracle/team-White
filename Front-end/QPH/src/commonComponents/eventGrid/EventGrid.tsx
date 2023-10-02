import { HomeEvent } from '../../models/home.event';
import { EventCard } from '../eventCard/EventCard';
import styles from './EventGrid.module.css'

export interface EventGridProps {
    events: HomeEvent[];
    onDelete: (eventId: number) => void;
}

export const EventGrid = ({ events, onDelete }: EventGridProps) => {

    return (
        <div className={styles.eventGrid}>
            {events.map((event, index) => (
                <div key={index}>
                    <EventCard event={event} onDelete={onDelete} />
                </div>
            ))}
        </div>
    );
}