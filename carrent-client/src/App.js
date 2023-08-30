import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";
import Loading from "./Loading/Loading";

const Home = lazy(() => import('./pages/Home'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const Car = lazy(() => import('./Components/Car'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const LogIn = lazy(() => import('./pages/LogIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const CartPage = lazy(() => import('./pages/CartPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1350,
      once: true
    }, [])
  })

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
