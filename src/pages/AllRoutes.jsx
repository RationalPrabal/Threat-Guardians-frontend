import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Dashboard from "./Dashboard";
import PrivateRoute from "../components/PrivateRoute";

export default function AllRoutes() {
  //! all routes component is rendering pages according to the path specified
  //! dashboard is protected route. if user is not logged in then it will redirect to login page
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
