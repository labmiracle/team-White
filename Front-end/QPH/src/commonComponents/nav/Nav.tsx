import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "../nav/nav.module.css";
import logoqph from "../../assets/logoqph.png";

const Nav: React.FC = () => {

  let isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirige al usuario a la página de inicio o a donde desees
    navigate("/");
  }


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
                <Link className={style.link} to="/musica">Musica</Link>

              </li>
              <li className={style.listItem}>
                <Link className={style.link} to="/arte">Arte</Link>
              </li>
              <li className={style.listItem}>
                <Link className={style.link} to="/gastronomia">Gastronomía</Link>
              </li>
              {isToken ? (
                <>
                  <li className={style.listItem}>
                    <Link className={style.link} to="/crear-evento">Crear Evento</Link>
                  </li>
                  <li className={style.listItem}>
                    <Link className={style.link} to="/mis-eventos">Mis Eventos</Link>
                  </li>
                  <li className={style.listItem}>
                    <li className={style.link} onClick={handleLogout}>Cerrar sesión</li>
                  </li>
                </>
              ) : (
                <>
                  <li className={style.listItem}>
                    <Link className={style.link} to="/login">Conectar</Link>
                  </li>
                  <li className={style.listItem}>
                    <Link className={style.link} to="/registrar">Registrar</Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
