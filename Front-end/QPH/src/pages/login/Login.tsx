import style from "./login.module.css";
import loginconcertimg from "../../assets/Concert-login.jpg";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle login form submission. If no jwt token is received it will throw error
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        mail: mail,
        password: password,
      });

      const token = response.data;

      if (!token) {
        throw new Error("No token received");
      }

      localStorage.setItem('token', token);

      navigate("/");

    } catch (error) {
      setError('Algo anda mal por favor revisa el e-mail o la contraseña');
    }
  };

  return (

    <div className={""}>
      {/* <Nav /> */}
      <div className={style.loginContainer}>
        <div className={style.formCOntainner}>
          <form className={`${style.formContainer} form`} action="" method="post">
            <p>Ingresar</p>
            <input type="text" placeholder="tucorreo@gmail.com" name="mail" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
            <input type="password" placeholder="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className={style.loginRegister}>
              <input type="submit" value="Ingresar" id="login" className={style.loginbtn} onClick={handleSubmit} />
              <Link to="/registrar">Register </Link>
              {<h6 className={style.errorMessage}>{error}</h6>}
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

export default Login