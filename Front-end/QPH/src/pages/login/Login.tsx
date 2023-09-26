import style from "./login.module.css"
import loginconcertimg from "../../assets/Concert-login.png"
import Nav from "../../commonComponents/nav/Nav"
import { useState } from "react"
import axios from "axios"



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/Auth/AuthLogin', {
              email,
              password,
            });
          
            console.log('Response:', response.data);
            // Assuming your server responds with a JWT token.
            // const { token } = response.data;
            window.location.href = '/main';
          } catch (error) {
            console.error('Login failed:', error);
            setError('Algo anda mal por favor revisa el e-email o la contraseña');
          }
    };

  return (
    
    <div className={""}>
    <Nav/>
    <div className={style.loginContainer}>    
        <div className={style.formCOntainner}> 
            <form className={`${style.formContainer} form`} action="" method="post">
                <p>Ingresar</p>
                <input type="text" placeholder="tucorreo@gmail.com"  name="emaiL" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <input type="submit" value="Ingresar" id="login" className={style.loginbtn} onClick={handleSubmit}/>
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