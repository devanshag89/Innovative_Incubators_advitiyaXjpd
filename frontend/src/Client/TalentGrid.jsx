import React, { useEffect, useState } from "react";
import axios from "axios";
import TalentCard from "./TalentCard";

const TalentGrid = () => {
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {talents.map((talent) => (
                      <TalentCard key={talent._id} talent={talent} />
                  ))}
              </div>
          </div>
      </div>
  );
};


export default TalentGrid;

