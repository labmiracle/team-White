import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface NewEvent {
    title: string;
    place: string;
    address: string;
    date: string;
    time: string;
    description: string;
    userId: number;
    image: File | null;
    category: string;
}

function NewEventForm() {
    const [newEvent, setNewEvent] = useState<NewEvent>({
        title: '',
        place: '',
        address: '',
        date: '',
        time: '',
        description: '',
        userId: 0,
        image: null,
        category: '',
    });

    const onDrop = (acceptedFiles: File[]) => {
        const image = acceptedFiles[0];
        setNewEvent({ ...newEvent, image });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
        },
        multiple: false, // Acepta solo una imagen
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", newEvent.title);
        formData.append("place", newEvent.place);
        formData.append("address", newEvent.address);
        formData.append("date", newEvent.date);
        formData.append("time", newEvent.time);
        formData.append("description", newEvent.description);
        formData.append("userId", newEvent.userId.toString());
        formData.append("category", newEvent.category);

        if (newEvent.image) {
            formData.append("image", newEvent.image);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // JWT token
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
                image: null,
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

                {/* Dropzone para la imagen */}
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>Arrastra y suelta una imagen aquí o haz clic para seleccionar.</p>
                </div>

                <button type="submit">Crear Evento</button>
            </form>
        </div>
    );
}

export default NewEventForm;
