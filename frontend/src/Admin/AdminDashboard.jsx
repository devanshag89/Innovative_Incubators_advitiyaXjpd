import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url('../images/Home-img.png')`, 
      }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-black bg-opacity-80  text-white h-screen pt-6 fixed shadow-lg">
        <h1 className="text-4xl font-bold mb-8 ml-8">ShowcaseX</h1>
        <nav>
          <ul className="mt-16">
            <li className="mb-4">
              <Link
                to="talents"
                className="block p-3 hover:bg-gray-100 hover:text-orange-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Talents
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="clients"
                className="block p-3 hover:bg-gray-100 hover:text-orange-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Clients
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="requests"
                className="block p-3 hover:bg-gray-100 hover:text-orange-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Requests
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="messagebox"
                className="block p-3 hover:bg-gray-100 hover:text-orange-600 text-white cursor-pointer font-semibold text-2xl text-center w-full transition-all duration-300"
              >
                Message Box
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 relative">
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content Wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <header className="shadow-lg p-4 flex justify-between items-center sticky top-0 bg-white rounded-lg mx-6 mt-6">
            <h3 className="text-3xl text-orange-600 font-semibold">Admin Dashboard</h3>
            <div className="flex items-center space-x-4">
              <img
                src="../images/admin.png"
                alt="Admin"
                className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md -mr-1"
              />
              <h3 className="text-lg text-orange-600">admin.1234@gmail.com</h3>
            </div>
          </header>

          {/* Main Section */}
          <main className="p-6 bg-opacity-90  rounded-lg shadow-md mx-6 mt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
