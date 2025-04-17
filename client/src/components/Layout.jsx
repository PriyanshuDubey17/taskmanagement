import React from "react";
import Navbar from "./Navbar"; 
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <div className="min-h-screen">
  
      <Navbar />

     
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
