import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import UserLogout from "../pages/UserLogout";
import Home from "../pages/Home";
import Project from "../pages/Project";
import UserAuth from "../auth/UserAuth";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuth><Home/></UserAuth>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} />
        <Route path="/logout" element={<UserLogout/>} />
        <Route path="/project" element={<UserAuth><Project/></UserAuth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
