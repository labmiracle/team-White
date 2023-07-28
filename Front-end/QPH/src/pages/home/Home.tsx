import Carousel from "../../commonComponents/carousel/Carousel";
import Footer from "../../commonComponents/footer/Footer";
import Nav from "../../commonComponents/nav/Nav";
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <Nav />
            <h1 className={styles.sectionTitle}>Los destacados del mes</h1>
            <Carousel />
            <Footer />
        </>
    );
}

export default Home;