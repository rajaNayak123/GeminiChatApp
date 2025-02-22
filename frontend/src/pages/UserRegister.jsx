import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const UserRegister = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newdata = {
      fullname,
      email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newdata
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    }
    setFullname("");
    setEmail("");
    setPassword("");
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md bg-white p-8 text-sm text-gray-900 flex flex-col gap-5 rounded-lg shadow-md">
        <div className="text-center font-semibold text-lg">
          Create new account
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col gap-1 mb-2">
            <label className="mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              placeholder="Enter your full name"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="mb-1">
              Email
            </label>
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
            <label className="mb-1">
              Password
            </label>
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
            Sign Up
          </button>
        </form>

        <p className="self-center font-medium">
          If have an account?
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline font-normal ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
