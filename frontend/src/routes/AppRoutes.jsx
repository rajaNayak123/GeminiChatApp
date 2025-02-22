import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import UserLogout from "../pages/UserLogout";
import Home from "../pages/Home";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/logout" element={<UserLogout/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
