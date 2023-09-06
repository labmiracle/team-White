import style from "./login.module.css"
import loginconcertimg from "../../assets/Concert-login.png"
import Nav from "../../commonComponents/nav/Nav"
const Register = () => {
  return (
    
    <div className={""}>
    <Nav/>
    <div className={style.loginContainer}>    
        <div className={style.formCOntainner}> 
            <form className={`${style.formContainer} form`} action="" method="post">
                <p>Ingresar</p>
                <input type="text" placeholder="tucorreo@gmail.com"  name="emai" id="emai"/>
                <div className={style.nameContainer}>
                <input type="text" placeholder="Tu nombre"  name="name" id="name"/>
                <input type="text" placeholder="Tu apellido"  name="lastName" id="lastName"/>
                </div>
                <input type="text" placeholder="password" name="password" id="password"/>
                <div className="">
                    <span>Soy una una organizacíon</span>
                    <input type="checkbox" name="organizacion" id="" />
                </div>
                <div>
                <input type="button" value="Crear Cuenta" id="login" className={style.loginbtn}/>
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