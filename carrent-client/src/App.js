import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1350,
      once: true
    }, [])
  })

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
