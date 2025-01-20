import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-500 text-white h-screen pt-6 fixed">
        <h1 className="text-4xl font-bold mb-8 ml-8 mb-24">ShowcaseX</h1>
        <nav>
          <ul className="mt-6">
            <li className="mb-4">
              <Link
                to="talents"
                className="block p-3 hover:bg-gray-100 hover:text-purple-700 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Talents
              </Link>
            </li>
            <li className="mb-4">
              <Link to="clients" className="block p-3 hover:bg-gray-100 hover:text-purple-700 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300">
                Clients
              </Link>
            </li>
            <li className="mb-4">
              <Link to="requests" className="block p-3 hover:bg-gray-100 hover:text-purple-700 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300">
                Requests
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      
      <div className="flex-1 ml-64">
        
        <header className="shadow-lg p-4 flex justify-between items-center sticky top-0">
          <h3 className="text-3xl text-purple-900 font-semibold">Admin Dashboard</h3>
          <div className="flex justify-between">
          <img
            src="../images/admin.png"
            alt="Admin"
            className="w-14 h-14 rounded-full object-cover border-4 border-white  mr-2 -mt-1"
          /> 
          <h3 className="text-lg text-purple-900 mt-3">admin.1234@gmail.com</h3>
          </div>
          
          
        </header>

       
        <main className="p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
