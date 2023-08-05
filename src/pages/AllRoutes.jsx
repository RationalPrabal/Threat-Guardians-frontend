import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Dashboard from "./Dashboard";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}
