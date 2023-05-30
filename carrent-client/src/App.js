import { Routes, Route, Navigate } from "react-router-dom"
import NavBar from './shared/NavBar';
import Home from "./pages/Home";

function App() {
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
