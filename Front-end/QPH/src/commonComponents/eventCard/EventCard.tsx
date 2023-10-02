import { CategoryTag } from "./CategoryTag";
import styles from "./styles/EventCard.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HomeEvent } from "../../models/home.event";
import eventImages from "./eventImages";

export interface EventCardProps {
  event: HomeEvent;
  onDelete?: (eventId: number) => void;
}

export function EventCard({ event, onDelete }: EventCardProps) {

  const location = useLocation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const shouldShowButtons = location.pathname === '/mis-eventos';

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(event.id);
      setShowConfirmDialog(false);
    }
  };

  // Obtiene la ruta de la imagen según el nombre en event.image
  let imageSource = eventImages[event.image] || eventImages.default;

  return (
    <div>
      <article className={styles.cardContainer}>
        <div className={styles.imageWithTag}>
          <img className={styles.eventImg} src={imageSource} alt="Event image" />
          <div className={styles.tagContainer}>
            <CategoryTag text={event.category} />
          </div>
        </div>
        <div className={styles.topContent}>
          <div>
            <h2 className={styles.title}>{event.title}</h2>
            <p className={styles.place}>Lugar: {event.place}</p>
          </div>
          <h3 className={styles.date}>{event.date} {event.time}</h3>
        </div>
        <div>
          <hr className={styles.line} />
        </div>
        <div className={styles.bottomContent}>
          <div>
            <p className={styles.organizedBy}>Organizado por</p>
            <p className={styles.organizer}>{event.organizedBy}</p>
          </div>
          <div>
            <Link to={`/event/${event.id}`} className={styles.eventLink}>Ir al evento {'>'}</Link>
          </div>
        </div>
      </article>
      {shouldShowButtons && (
        <>
          <button onClick={handleDeleteClick} className={styles.deleteButton}>Eliminar</button>

          {showConfirmDialog && (
            <div>
              <p>¿Estás seguro de que deseas eliminar este evento?</p>
              <button onClick={handleConfirmDelete}>Confirmar</button>
              <button onClick={() => setShowConfirmDialog(false)}>Cancelar</button>
            </div>
          )}

          <Link to={`/editar-evento/${event.id}`}>
            <button className={styles.editButton}>Editar</button>
          </Link>
        </>
      )}
    </div>

  );
}