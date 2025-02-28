import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";

const UserAuth = ({ children }) => {
  const { user } = useContext(userDataContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserAuth;
