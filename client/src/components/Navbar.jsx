import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-[#576ee4] p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img
            src={localStorage.getItem("profileImgUrl")}
            alt="Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="text-white md:text-lg font-semibold">
            {`Hi ${localStorage.getItem("fullName")} 👋 Welcome Back`}
          </div>
        </div>

        <div>
          <Link
            to="/layout/tasks"
            className="bg-black mr-4 text-white px-4 py-2 rounded shadow hover:bg-[#202020] transition duration-200 text-sm md:text-base"
          >
            All Task
          </Link>
          <Link
            to="/layout/add-task"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100 transition duration-200 text-sm md:text-base"
          >
            Add Task
          </Link>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded transition duration-200 text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
