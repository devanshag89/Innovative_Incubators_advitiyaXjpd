import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";

const ProfileCard = () => {
  const [user, setUser] = useState({ skills: [] }); // Initialize skills as an empty array
  const { email } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/gettalent", {
          params: {
            email: email,
          },
        });
        setUser(response.data.talent);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserName();
  }, [email]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src={user.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user.name || "N/A"}</h2>
          <p className="text-gray-500 text-sm">
            {user.personalDescription || "No description available"}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <span className="material-icons mr-2 text-gray-500">Email: </span>
          <p className="text-sm">{user.email || "N/A"}</p>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="material-icons mr-2 text-gray-500">Name: </span>
          <p className="text-sm">{user.phoneNo || "N/A"}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-3 gap-3">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-full shadow-sm hover:bg-gray-200 transition duration-200"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
