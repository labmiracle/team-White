import axios from "axios";
import { useEffect, useState } from "react"





const MiCuenta = () => {
    const [useData, setUserData]=useState();   
    let useInfo= localStorage.getItem("token") ;

   
    useEffect(()=>{
        axios.get("http://localhost:5173/api/events/${id}")
        .then(response=> setUserData(response.data));
    },[])

  return (
    <div>MiCuenta</div>
  )
}

export default MiCuenta