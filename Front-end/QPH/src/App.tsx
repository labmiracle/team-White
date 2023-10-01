import Home from "./pages/home/Home";
import Gastronomy from "./pages/gastronomy/Gastronomy";
import Art from "./pages/art/Art";
import Music from "./pages/music/Music";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import NewEventForm from "./commonComponents/newEvent/NewEventForm";
import ProtectedRoutes from "./router/protectedRoute/ProtectedRoutes";
import Nav from "./commonComponents/nav/Nav";
import Footer from "./commonComponents/footer/Footer";
import MiCuenta from "./pages/miCuenta/MiCuenta";

function App() {

  return (
    <div className="App">


      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/gastronomy" element={<Gastronomy />} />
          <Route path="/muestras-artísticas" element={<Art />} />
          <Route path="/musica" element={<Music />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />

          <Route path="/login" element={<Login />} />


          <Route element={<ProtectedRoutes />}>
            <Route path="/crear-evento" element={<NewEventForm />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
