import style from "./login.module.css"
import loginconcertimg from "../../assets/Concert-login.png"
import Nav from "../../commonComponents/nav/Nav"
import { useState } from "react"
import axios from "axios"

const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const [artist, setArtist] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/Auth/AuthRegister", {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        userType: artist ? "artist" : "organization",
        active: active ? 1 : 0
      });

      // Handle the response as needed
      console.log("Registration Successful:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="">
      <Nav />
      <div className={style.loginContainer}>
        <div className={style.formContainer}>
          <form className={`${style.formContainer} form`} onSubmit={handleRegister}>
            <p>Ingresar</p>
            <input type="text" placeholder="tucorreo@gmail.com" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className={style.nameContainer}>
              <input type="text" placeholder="Tu nombre" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Tu apellido" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <input type="text" placeholder="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="">
              <span>Soy una organización</span>
              <input type="checkbox" name="organizacion" id="organizacion" checked={active} onChange={(e) => setActive(e.target.checked)} />
              <span>Soy un artista</span>
              <input type="checkbox" name="artist" id="artist" checked={artist} onChange={(e) => setArtist(e.target.checked)} />
            </div>
            <div>
              <input type="submit" value="Crear Cuenta" id="login" className={style.loginbtn} />
              <span>Conectar</span>
            </div>
          </form>
        </div>
        <div className="">
          <figure>
            <img src={loginconcertimg} alt="imagen de un concierto" />
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Register;
