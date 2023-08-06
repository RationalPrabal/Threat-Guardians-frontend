import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Dashboard from "./Dashboard";
import PrivateRoute from "../components/PrivateRoute";

export default function AllRoutes() {
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
