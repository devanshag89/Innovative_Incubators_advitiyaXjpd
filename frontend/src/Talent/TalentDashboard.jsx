import React, { useState } from "react";
import TalentNavbar from "./TalentNavbar";
import ProfileCard from "./ProfileCard";


const TalentDashboard = () => {
  const recruiter = [
    "Travel Images.psd",
    "True Photos.jpg",
    "Dashboard Struct.pdf",
    "Character Illustration.zip",
  ];

  

  return (
    <>
      <TalentNavbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <main className="container mx-auto p-6">
          {/* Profile and Actions Section */}
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Card */}
            <ProfileCard/>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <span className="material-icons text-gray-600 text-4xl">add</span>
                <p className="text-gray-500 text-sm mt-2">Add New</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <span className="material-icons text-green-500 text-4xl">photo</span>
                <p className="text-gray-600 text-sm mt-2">Photos</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <span className="material-icons text-blue-500 text-4xl">photo</span>
                <p className="text-gray-600 text-sm mt-2">Images</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <span className="material-icons text-purple-500 text-4xl">photo</span>
                <p className="text-gray-600 text-sm mt-2">Gallery</p>
              </div>
            </div>
          </section>

          {/* Chatbox and Hire Requests */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chatbox */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Chatbox</h2>
              <p className="text-gray-500 text-sm">
                Stay connected and interact with potential recruiters.
              </p>
            </div>

            {/* Hire Requests */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Hire Requests</h2>
              <ul className="space-y-4">
                {recruiter.map((name, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <p className="text-gray-700 font-medium">{name}</p>
                    </div>
                    <button className="px-4 py-1 text-sm bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-200">
                      Connect
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TalentDashboard;
