import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home";
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";
import CarDetails from "./pages/CarDetails";
import Car from "./Components/Car";

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
        <Route
          path="/car-details"
          element={<CarDetails />}
        />
        <Route path="/car/:id" element={<Car />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
