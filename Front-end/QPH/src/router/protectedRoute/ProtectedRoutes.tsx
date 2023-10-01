import { Navigate,Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    let isLogged =localStorage.getItem("token")

    if (!isLogged){
       return <Navigate to={"/login"}/>
    }


  return (
        <Outlet/>
  )
}

export default ProtectedRoutes