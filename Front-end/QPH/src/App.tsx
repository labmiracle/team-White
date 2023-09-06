import Home from "./pages/home/Home";
import Gastronomy from "./pages/gastronomy/Gastronomy";
import Art from "./pages/art/Art";
import Music from "./pages/music/Music";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gastronomy" element={<Gastronomy />} />
          <Route path="/muestras-artísticas" element={<Art />} />
          <Route path="/musica" element={<Music />} />
          <Route path="/login" element={<Login />} />
        
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
