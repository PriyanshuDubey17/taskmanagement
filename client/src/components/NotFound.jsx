import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-9xl font-bold text-[#151313]">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-center text-gray-600 mt-2 mb-6">
        Oops! yeh page nhi hai.
      </p>
      <Link
        to="/"
        className="bg-[black] text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
         Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
