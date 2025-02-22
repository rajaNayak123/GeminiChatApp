import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
