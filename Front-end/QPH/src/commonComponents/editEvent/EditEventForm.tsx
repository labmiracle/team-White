import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ServerEvent } from '../../models/server.event';
import { HomeEvent } from '../../models/home.event';
import styles from './editEventForm.module.css';

function EditEventForm() {
    const { id } = useParams();
    console.log(id);

    const [editedEvent, setEditedEvent] = useState<HomeEvent>({
        id: 0,
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

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Realiza una solicitud GET para obtener los datos del evento a editar
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/event/${id}`);
                const eventDetails: ServerEvent = response.data;

                // Actualiza el estado con los datos del evento
                setEditedEvent({
                    id: eventDetails.id,
                    title: eventDetails.title,
                    place: eventDetails.place,
                    address: eventDetails.address,
                    date: eventDetails.date,
                    time: eventDetails.time,
                    description: eventDetails.description,
                    userId: eventDetails.userId,
                    image: eventDetails.image,
                    category: eventDetails.category,
                    organizedBy: eventDetails.organizedBy,
                });

                setError(null);
            } catch (error) {
                console.error('Error al obtener los detalles del evento:', error);
                setError('Error al obtener los detalles del evento.');
            }
        };

        fetchEventDetails();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Realiza una solicitud PUT para actualizar los detalles del evento
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Debes iniciar sesión para editar un evento');
                return;
            }

            await axios.put("http://localhost:5000/api/events", editedEvent, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': `${token}`,
                },
            });

            console.log('Evento editado con éxito');
            setError(null);
        } catch (error) {
            console.error('Error al editar el evento:', error);
            setError('Error al editar el evento.');
        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Editar Evento</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Título: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="title"
                            value={editedEvent.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Lugar: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="place"
                            value={editedEvent.place}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Dirección: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="address"
                            value={editedEvent.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Fecha: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="date"
                            value={editedEvent.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Hora: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="time"
                            value={editedEvent.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Descripción: </label>
                        <input

                            className={styles.formInput}
                            type="text"
                            name="description"
                            value={editedEvent.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Categoría: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="category"
                            value={editedEvent.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className={styles.createbtn} type="submit">Guardar cambios</button>
                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default EditEventForm;
