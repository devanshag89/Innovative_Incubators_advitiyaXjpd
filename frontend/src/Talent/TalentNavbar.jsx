import React from "react";
import { useAuth } from "../contexts/TalentContext";




function TalentNavbar() {
  const {email,logout}=useAuth();
  // Handle logout action
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-black bg-opacity-70 fixed top-0 left-0 w-full z-50 shadow-none mb-96">
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo Section */}
        <h1 className="cursor-pointer text-white font-bold text-3xl opacity-100" >Showcase<span className="text-orange-500">X</span></h1>
        
        {/* Right Section: Email and Logout */}
        <div className="flex items-center space-x-8">
          <h1 className="text-md text-white font-medium opacity-100">
            {email}
          </h1>
          <button
            onClick={handleLogout}
            className="text-orange-500 border border-orange-500 shadow-md hover:bg-orange-500 hover:text-white px-4 py-2 rounded-md  transition duration-200 opacity-100"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}


export default TalentNavbar;
