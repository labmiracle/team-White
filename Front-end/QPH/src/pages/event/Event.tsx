import { useEffect, useState } from "react";
import EventComplete from "../../commonComponents/EventComplete/EventComplete";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { HomeEvent } from "../../models/home.event";
import { ServerEvent } from "../../models/server.event";
import event1 from './../../assets/event1.jpg';

const Event: React.FC = () => {

    // gettin id from url parameters
    const { id } = useParams();

    const [event, setEvent] = useState<HomeEvent>();


    useEffect(() => {

        async function fetchEvents() {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/event/${id}`)
                const serverEvent: ServerEvent = response.data;

                // Map server event to frontend format
                const frontendEvent: HomeEvent = {
                    id: serverEvent.id,
                    title: serverEvent.title,
                    place: serverEvent.place,
                    address: serverEvent.address,
                    date: serverEvent.date,
                    time: serverEvent.time,
                    description: serverEvent.description,
                    userId: serverEvent.userId,
                    image: event1,
                    category: serverEvent.category,
                    featured: serverEvent.featured,
                    organizedBy: serverEvent.organizedBy,
                };

                setEvent(frontendEvent);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, [id]);



    return (
        <>
            {event !== undefined && <EventComplete event={event} />}
        </>
    )
}

export default Event;