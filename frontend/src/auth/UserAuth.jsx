import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";

const UserAuth = ({ children }) => {
  const { user } = useContext(userDataContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
    if (!token) {
      navigate("/login");
    }
    if (!user) {
      navigate("/register");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
};

export default UserAuth;
