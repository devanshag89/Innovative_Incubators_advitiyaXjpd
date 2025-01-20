import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientDashboard = () => {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    // Fetch approved talents from the API
    const fetchTalents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-pending-talents");
        setTalents(response.data.talents);
      } catch (error) {
        console.error("Error fetching talents:", error);
      }
    };

    fetchTalents();
  }, []);

  return (
      <div>
          <div className="bg-gray-100 min-h-screen p-6">
              <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                  Client Dashboard
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {talents.map((talent) => (
                      <TalentCard key={talent._id} talent={talent} />
                  ))}
              </div>
          </div>
      </div>
  );
};

const TalentCard = ({ talent }) => {
  const handleHire = () => {
    alert(`You hired ${talent.name}`);
    // Add your "hire" logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200 hover:shadow-xl">
      <div className="flex justify-center p-4">
        <img
          src={talent.profilePhoto || "https://via.placeholder.com/150"}
          alt={talent.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
      </div>
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-gray-800">{talent.name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {talent.category || "Uncategorized"}
        </p>
        <button
          onClick={handleHire}
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors duration-200"
        >
          Hire
        </button>
      </div>
    </div>
  );
};

export default ClientDashboard;
