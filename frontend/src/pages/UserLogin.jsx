import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      alert("Please enter 6 digits password");
      return;
    }

    const newdata = { email, password };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      newdata
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data);
      localStorage.setItem("token", data.token);
      navigate("/");

      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md bg-white p-8 text-sm text-gray-900 flex flex-col gap-5 rounded-lg shadow-md">
        <div className="text-center font-semibold text-lg">
          Login your account
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-1">
            <label className="mb-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label className="mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-7 cursor-pointer text-white bg-gray-900 rounded-md shadow-md hover:bg-gray-800 active:scale-95 transition"
          >
            Login
          </button>
        </form>

        <p className="self-center font-medium">
          Don't have an account?
          <Link
            to={"/register"}
            className="text-blue-600 hover:underline font-normal ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
