import Home from "./pages/home/home";
import Gastronomy from "./pages/gastronomy/gastronomy";
import Art from "./pages/art/art";
import Music from "./pages/music/music";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/gastronomy" element={<Gastronomy />} />
          <Route path="/muestras-artísticas" element={<Art />} />
          <Route path="/musica" element={<Music />} />
        
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
