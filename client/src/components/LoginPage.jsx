import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    //console.log(fullName, phone, email, password, confirmPassword);
    const loginData = {
      email: email,
      password: password,
    };

    axios
      .post("https://taskmanagement-u110.onrender.com/api/v1/user/login", loginData)
      .then((result) => {
        setIsLoading(false);
        toast(result.data.message);
        // console.log(result);
        const { fullName, token, profileImgUrl } = result.data.userData;
        // console.log(fullName, token, profileImgUrl);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("token", token);
        localStorage.setItem("profileImgUrl", profileImgUrl);
        Navigate("/layout/add-task");
      })
      .catch((error) => {
        setIsLoading(false);
        toast(error.response.data.message);
        // console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="block mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {isLoading && <i className="fas fa-spinner fa-pulse"></i>} Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
