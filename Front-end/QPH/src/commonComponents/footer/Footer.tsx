import React from "react";
import style from "../footer/footer.module.css";
import logo from "../../assets/logoqph.png"
import instagramLogo from "../../assets/insta 1.png"
import twiterLogo from "../../assets/twitter 1.png"


interface FooterProps {
  // If you have any props to pass to the Footer component, define their types here.
  // For example, if you have a prop named "year" of type number:
  // year: number;
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <footer className={style["main-footer"]}>

        <div className={style["logo-container"]}>
          <img src={logo} alt="Logo que pinta hoy en el pie de la pagina" />
        </div>
        <div className={style["address-container"]}>
          <img src="../../assets/A5A5DEE7-50FA-49F7-AAB4-7B445D7A9D46 1.png" alt="" />
          <ul>
            <li className={style["address-container ul li"]}>Homeless 123 - Rosario, Sta Fe</li>
          </ul>
        </div>
        <div className={style["copyright-container"]}>
          <ol className={`${style["address-container"]} ${style["ol"]}`}>
            <li>Copyright ©2023</li>
          </ol>
          <figure className={style["copyright-container figure"]}>
            <img src={instagramLogo} alt="Logo instagram en el pie del sito que pinta hoy" />
            <img src={twiterLogo} alt="Logo twiter en el pie de pagina del sito que pinta hoy" />
          </figure>
          
        </div>
      </footer>
    </>
  );
};

export default Footer;
