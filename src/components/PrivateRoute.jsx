import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  //! Custom private route component. If user is not authenticated then it will always return to the login page
  return !isAuth ? <Navigate to="/login"></Navigate> : children;
}

export default PrivateRoute;
