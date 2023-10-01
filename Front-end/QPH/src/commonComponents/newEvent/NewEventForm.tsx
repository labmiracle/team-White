import React, { useState } from 'react';
import axios from 'axios';
import { NewEvent } from '../../models/new.event';
import styles from './NewEventForm.module.css';
import jwt_decode from "jwt-decode";

function NewEventForm() {

    const [newEvent, setNewEvent] = useState<NewEvent>({
        title: "",
        place: "",
        address: "",
        date: "",
        time: "",
        description: "",
        userId: 0,
        image: "",
        category: "",
        organizedBy: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Debes iniciar sesión para crear un evento');
                return;
            }

            const decoded = jwt_decode(token) as { mail: string, id: number, alias: string };

            console.log(decoded);

            const updatedEvent = { ...newEvent, userId: decoded.id, organizedBy: decoded.alias };

            console.log(updatedEvent);

            const response = await axios.post('http://localhost:5000/api/events', updatedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': `${token}`,
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
                userId: 0,
                image: '',
                category: '',
                organizedBy: '',
            });

            setError(null);

        } catch (error) {
            console.error('Error al crear el evento:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Crear Nuevo Evento</h2>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label className={styles.label}>Título: </label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Lugar: </label>
                        <input
                            type="text"
                            name="place"
                            value={newEvent.place}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Dirección: </label>
                        <input
                            type="text"
                            name="address"
                            value={newEvent.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Fecha: </label>
                        <input
                            type="text"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Hora: </label>
                        <input
                            type="text"
                            name="time"
                            value={newEvent.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Descripción: </label>
                        <input
                            type="text"
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Categoría: </label>
                        <input
                            type="text"
                            name="category"
                            value={newEvent.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit">Crear Evento</button>

                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default NewEventForm;
