import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/TalentContext";

function TalentNavbar() {
  const navigate = useNavigate();

  const {email,logout} = useAuth();
  // Handle logout action
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 shadow-md w-full">
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo Section */}
        <h1 className="text-2xl font-bold text-white tracking-wide">ShowcaseX</h1>
        
        {/* Right Section: Email and Logout */}
        <div className="flex items-center space-x-8">
          <h1 className="text-sm text-gray-300 font-medium">
            {email}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TalentNavbar;
