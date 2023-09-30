import React, { useState } from 'react';
import axios from 'axios';
import { NewEvent } from '../../models/new.event';

function NewEventForm() {
    const [newEvent, setNewEvent] = useState<NewEvent>({
        title: "",
        place: "",
        address: "",
        date: "",
        time: "",
        description: "",
        userId: 1,
        image: "",
        category: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/events', newEvent, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Evento creado con éxito:', response.data);

            setNewEvent({
                title: '',
                place: '',
                address: '',
                date: '',
                time: '',
                description: '',
                userId: 1,
                image: '',
                category: '',
            });

        } catch (error) {
            console.error('Error al crear el evento:', error);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Evento</h2>
            <form onSubmit={handleSubmit}>
                {/* Título */}
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Lugar:</label>
                    <input
                        type="text"
                        name="place"
                        value={newEvent.place}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={newEvent.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="text"
                        name="date"
                        value={newEvent.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Hora:</label>
                    <input
                        type="text"
                        name="time"
                        value={newEvent.time}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={newEvent.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input
                        type="text"
                        name="category"
                        value={newEvent.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Crear Evento</button>
            </form>
        </div>
    );
}

export default NewEventForm;
