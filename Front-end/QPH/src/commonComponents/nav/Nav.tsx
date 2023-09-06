import React from 'react';
import { Link } from 'react-router-dom';
import style from "../nav/nav.module.css";
import logoqph from "../../assets/logoqph.png"; 

const Nav: React.FC = () => {
  return (
    <>
      <nav>
        <div className={style.container}>
          <div className={style.logoqph}>
            <img src={logoqph} alt="Logo del sitio: Que Pinta Hoy" />
          </div>
          <div className={style.menu + ' ' + style.u}>
            <ul>
              <li className={style.listItem}>
                <Link className={style.link} to="/">Inicio</Link>
              </li>
              <li className={style.listItem}>
                <Link className={style.link}  to="/musica">Musica</Link>
                
              </li>
              <li className={style.listItem}>
                <Link className={style.link}  to="/muestras-artísticas">Arte</Link>
              </li>
              <li className={style.listItem}>
                <Link className={style.link}  to="/gastronomy">Gastronomía</Link>
              </li>
              <li className={style.listItem}>
                {/* <Link className={style.link}  to="/filtrar">Filtrar</Link> */}
                Filtrar
              </li>
              <li className={style.listItem}>
                { <Link className={style.link}  to="/login">Conectar</Link>}
                Mi Cuenta
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
