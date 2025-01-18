import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
          <img
              src="../images/admin.png"
              alt="User"
              className="w-10 h-10 rounded-full -mr-2"
            />
            <span className="material-icons">admin.1234@gmail.com</span>
            
          </div>
        </header>

        <section className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-sm text-gray-600">Count of talented people</h2>
            <p className="text-lg font-bold">1.7M</p>
          </div>
          <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-sm text-gray-600">Count hireres</h2>
            <p className="text-lg font-bold">9M</p>
          </div>
        </section>
        <section className="mt-6 bg-white p-4 shadow rounded-md">
          <h2 className="text-lg font-bold">Technical Support</h2>
          <p>Chart placeholder here</p>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
