import style from "./login.module.css";
import loginconcertimg from "../../assets/Concert-login.png";
import Nav from "../../commonComponents/nav/Nav";
import { useState } from "react";
import axios from "axios";



const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        mail: mail,
        password: password,
      });

      const token = response.data;

      if (!token) {
        throw new Error;
      }

      localStorage.setItem('token', token);

    } catch (error) {
      setError('Algo anda mal por favor revisa el e-mail o la contraseña');
    }
  };

  return (

    <div className={""}>
      <Nav />
      <div className={style.loginContainer}>
        <div className={style.formCOntainner}>
          <form className={`${style.formContainer} form`} action="" method="post">
            <p>Ingresar</p>
            <input type="text" placeholder="tucorreo@gmail.com" name="mail" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
            <input type="password" placeholder="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Ingresar" id="login" className={style.loginbtn} onClick={handleSubmit} />
            {error && <p className={style.errorMessage}>{error}</p>}

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

export default Login