import style from "./register.module.css";
import loginconcertimg from "../../assets/Concert-login.jpg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alias, setAlias] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name: name,
        lastName: lastName,
        alias: alias,
        mail: mail,
        password: password,
        userType: 0,

      });

      console.log("Registration Successful:", response.data);
      navigate("/login");

    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className={style.superContainer}>
      {/* <Nav /> */}
      <div className={style.evenContainer}>
        <div className={style.loginContainer}>
          <form className={style.form} onSubmit={handleRegister}>
            <p className={style.formParagraph}>Crear cuenta</p>
            <input className={style.formInput} type="text" placeholder="tucorreo@gmail.com" name="email" id="email" value={mail} onChange={(e) => setEmail(e.target.value)} />

            <input className={style.formInput} type="text" placeholder="Tu nombre" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={style.formInput} type="text" placeholder="Tu apellido" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

            <input className={style.formInput} type="text" placeholder="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <input className={style.formInput} type="text" placeholder="alias" name="alias" id="alias" value={alias} onChange={(e) => setAlias(e.target.value)} />
            <div className={style.btnCreate}>
              <input className={style.loginBtn} type="submit" value="Crear Cuenta" id="login" />
              <Link to="/login"><input className={style.loginBtn} type="button" value="Conectar" id="login" /></Link>

            </div>
          </form>
        </div>
        <div className={`${style.imgContainer} img`}>
          <figure>
            <img src={loginconcertimg} alt="imagen de un concierto" />
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Register;
