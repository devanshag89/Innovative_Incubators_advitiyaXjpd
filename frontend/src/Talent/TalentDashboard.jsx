import React from "react";
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
      <div className="min-h-screen bg-gray-100 flex">
        <main className="flex-1 p-6">
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-3 rounded-lg shadow-lg">
            <ProfileCard />
            <div className="flex mt-4 space-x-4">
              <div className="w-32 h-32 bg-gray-100 rounded-md shadow-sm flex items-center justify-center">
                <span className="material-icons text-gray-400">add</span>
              </div>
              <div className="w-32 h-32 bg-green-200 rounded-md shadow-sm flex flex-col items-center justify-center text-center">
                <span className="material-icons text-lime-500 text-4xl">
                  Photo
                </span>
              </div>
              <div className="w-32 h-32 bg-purple-200 rounded-md shadow-sm flex flex-col items-center justify-center text-center">
                <span className="material-icons text-purple-500 text-4xl">
                  Photo
                </span>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-md shadow-sm flex flex-col items-center justify-center text-center">
                <span className="material-icons text-gray-500 text-4xl">
                  Photo
                </span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Chatbox
              </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Hire Requests
              </h2>
              <ul className="space-y-4">
                {recruiter.map((name, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center space-x-4">
                      <p>{name}</p>
                    </div>
                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full shadow-sm">
                      connect
                    </span>
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
