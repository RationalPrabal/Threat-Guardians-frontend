import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);

  return !isAuth ? <Navigate to="/login"></Navigate> : children;
}

export default PrivateRoute;
