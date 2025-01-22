import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";

const ProfileCard = () => {
  const [user, setUser] = useState({ skills: [], hireRequest: null }); // Added hireRequest state
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

  const handleHireRequest = async () => {
    try {
      // Send hire request to the backend
      await axios.post("http://localhost:4000/api/v1/hiretalent", {
        email: user.email,
      });
      setUser({ ...user, hireRequest: "pending" }); // Update hireRequest state to pending
    } catch (err) {
      console.error("Error sending hire request:", err);
    }
  };

  const handleRequestResponse = async (response) => {
    try {
      // Send the response to the backend (accept or reject)
      await axios.post("http://localhost:4000/api/v1/respondhire", {
        email: user.email,
        response: response,
      });
      setUser({ ...user, hireRequest: response === "accept" ? "hired" : "rejected" }); // Update status based on response
    } catch (err) {
      console.error("Error responding to hire request:", err);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500">
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

      {/* Hire Request Notification */}
      {user.hireRequest === "pending" && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm">
          <p>Client has sent a hire request!</p>
          <div className="mt-2 flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => handleRequestResponse("accept")}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleRequestResponse("reject")}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {user.hireRequest === "hired" && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm">
          <p>You have been hired by the client!</p>
        </div>
      )}

      {user.hireRequest === "rejected" && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow-sm">
          <p>You have rejected the hire request.</p>
        </div>
      )}

      {/* Skills Section */}
      <div className="mt-6 bg-gray-200">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-3 gap-3">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm bg-orange-300 text-gray-800 rounded-full shadow-sm hover:bg-gray-200 transition duration-200"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills available</p>
          )}
        </div>
      </div>

      {/* Hire Button */}
      {user.hireRequest === null && (
        <div className="mt-4">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleHireRequest}
          >
            Hire This Talent
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
