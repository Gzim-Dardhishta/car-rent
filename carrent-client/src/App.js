import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css";
import Loading from "./Loading/Loading";
import ProtectedRoutes from "./ProtectedRoutes";
import jwtDecode from "jwt-decode";
// import jwt from 'jsonwebtoken';

const Home = lazy(() => import('./pages/Home'));
const CarDetails = lazy(() => import('./pages/CarDetails'));
const Car = lazy(() => import('./Components/Car'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const LogIn = lazy(() => import('./pages/LogIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const CartPage = lazy(() => import('./pages/CartPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const Orders = lazy(() => import('./pages/Order'))
const CarsPage = lazy(() => import('./pages/CarsDPage'))

function App() {

  useEffect(() => {
    Aos.init({
      duration: 1350,
      once: true
    }, [])
  })

  const token = localStorage.getItem("access_token");


  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken) {
      var roles = decodedToken.roles;

      var role = roles.substring(1, roles.length - 1)
    } else {
      console.error('Failed to decode the JWT token.');
    }
  } catch (error) {
    console.error('Error decoding JWT token:', error);
  }

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/car/:carId" element={<CarDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />


          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/cars" element={<CarsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
