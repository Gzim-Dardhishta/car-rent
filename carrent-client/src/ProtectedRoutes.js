import { Navigate, Outlet } from 'react-router-dom'
import jwtDecode from "jwt-decode";


const ProtectedRoutes = () => {
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

  if(role === 'ROLE_ADMIN' || role === 'ROLE_MODERATOR'){
    var admin = "Admin"
  }

  return (
    admin ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoutes