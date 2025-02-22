import React from "react";
import { Link } from "react-router-dom";

const UserRegister = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md bg-white p-8 text-sm text-gray-900 flex flex-col gap-5 rounded-lg shadow-md">
        <div className="text-center font-semibold text-lg">
          Create new account
        </div>

        <form className="flex flex-col">
          <div className="flex flex-col gap-1 mb-2">
            <label for="fullname" className="mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="name"
              placeholder="Enter your full name"
              required
              class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label for="email" class="mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <label for="email" class="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="email"
              placeholder="Enter your password"
              required
              class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-600 placeholder-opacity-50"
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
