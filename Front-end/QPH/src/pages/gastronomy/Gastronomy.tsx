import React from 'react';
import Nav from '../../commonComponents/nav/Nav';
import Footer from '../../commonComponents/footer/Footer';
import { EventGrid } from '../../commonComponents/eventGrid/EventGrid';
import styles from './Gastronomy.module.css';

const Music: React.FC = () => {
  return (
    <>
      <Nav />
      <div className={styles.sectionTitle}>
        <h1>Eventos de Gastronomía</h1>
      </div>
      <EventGrid />
      <Footer/>
    </>
  )
}

export default Music