import React, { useState } from 'react';
import axios from 'axios';
import { NewEvent } from '../../models/new.event';
import styles from './NewEventForm.module.css';
import jwt_decode from "jwt-decode";
import createEvent from "../../assets/Concert-login.png"

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

            const updatedEvent = { ...newEvent, userId: decoded.id, organizedBy: decoded.alias };

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

            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Crear Nuevo Evento</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.divForm}>
                        <label className={styles.inputLabel}>Título: </label>
                        <input
                            className={styles.formInput}
                            type="text"
                            name="title"
                            value={newEvent.title}
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
                            value={newEvent.place}
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
                            value={newEvent.address}
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
                            value={newEvent.date}
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
                            value={newEvent.time}
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
                            value={newEvent.description}
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
                            value={newEvent.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className={styles.createbtn} type="submit">Crear Evento</button>
                    {error && <div className={styles.error}>{error}</div>}
                </form>
            </div>
            <div>
                <img src={createEvent} alt="registrar evento" width={500} height={500} />
            </div>

        </div>
    );
}

export default NewEventForm;
