import React, { useState } from 'react';
import axios from 'axios';
import { NewEvent } from '../../models/new.event';
import style from './NewEventForm.module.css';
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
        userId: 1,
        image: "",
        category: "",
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

            const decoded = jwt_decode(token) as { mail: string, id: number };

            console.log(decoded.id);

            const updatedEvent = { ...newEvent, userId: decoded.id };

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
                userId: 1,
                image: '',
                category: '',
            });

            setError(null);

        } catch (error) {
            console.error('Error al crear el evento:', error);
        }
    };

    return (
        <div className={style.container}>
           
            <div className ={style.formContainer}>
                 <h2 className={style.formTitle}>Crear Nuevo Evento</h2>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Título: </label>
                        <input
                        className={style.formInput}
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Lugar: </label>
                        <input
                            className={style.formInput}
                            type="text"
                            name="place"
                            value={newEvent.place}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Dirección: </label>
                        <input
                            className={style.formInput}
                            type="text"
                            name="address"
                            value={newEvent.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Fecha: </label>
                        <input
                            className={style.formInput}
                            type="text"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Hora: </label>
                        <input
                            className={style.formInput}
                            type="text"
                            name="time"
                            value={newEvent.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Descripción: </label>
                        <input
                            
                            className={style.formInput}
                            type="text"
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={style.divForm}>
                        <label className={style.inputLabel}>Categoría: </label>
                        <input
                            className={style.formInput}
                            type="text"
                            name="category"
                            value={newEvent.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button className={style.createbtn}   type="submit">Crear Evento</button>
                    {error && <div className={style.error}>{error}</div>}
                </form>
            </div>
            <div>
                <img src={createEvent} alt="registrar evento" width={500} height={500}/>
            </div>

        </div>
    );
}

export default NewEventForm;
