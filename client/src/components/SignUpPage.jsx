import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
const SignUpPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [isLoading, setIsLoading]= useState(false)
 const Navigate= useNavigate()


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const newUser= new FormData();
    newUser.append("fullName",fullName);
    newUser.append("email",email);
    newUser.append("password",password);
    newUser.append("photo",profilePic);

    axios.post("http://localhost:4000/api/v1/user/sign-up", newUser)
    
    .then((result)=>{
     setIsLoading(false)
     toast(result.data.message)
    Navigate("/login")
    // console.log(result)
    })
    .catch((error)=>{
     setIsLoading(false)
    //  console.log(error)
     toast(error.response.data.message)
    })
 
    // console.log("Form Submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              onChange={(e)=>{setFullName(e.target.value)}}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              onChange={(e)=>{setPassword(e.target.value)}}
              required
            />
          </div>


          <div>
            <label className="block mb-1 text-gray-700">Profile Picture</label>
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="mt-4 w-24 h-24 object-cover rounded-full mx-auto border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
             {isLoading && <i className="fas fa-spinner fa-pulse"></i>} Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
