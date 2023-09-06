import style from "./login.module.css"
import loginconcertimg from "../../assets/Concert-login.png"
import Nav from "../../commonComponents/nav/Nav"
const Login = () => {
  return (
    
    <div className={""}>
    <Nav/>
    <div className={style.loginContainer}>    
        <div className={style.formCOntainner}> 
            <form className={`${style.formContainer} form`} action="" method="post">
                <p>Ingresar</p>
                <input type="text" placeholder="tucorreo@gmail.com"  name="emai" id="emai"/>
                <input type="text" placeholder="password" name="password" id="password"/>
                <input type="button" value="Ingresar" id="login" className={style.loginbtn}/>
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