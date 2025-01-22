import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";
import { FaCheck, FaTimes, FaBell } from "react-icons/fa";

const ProfileCard = () => {
  const [user, setUser] = useState({ skills: [], hireRequest: null });
  const [hireRequests, setHireRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newRequest, setNewRequest] = useState(false);
  const { email } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/gettalent",
          {
            params: { email },
          }
        );
        setUser(response.data.talent);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    const fetchHireRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getHireRequests",
          {
            params: { talentId: user._id },
          }
        );
        const newRequests = response.data.requests.filter(
          (req) => req.status === "pending"
        );
        console.log(newRequests);
        setHireRequests(newRequests);
        setNewRequest(newRequests.length > 0);
      } catch (err) {
        console.error("Error fetching hire requests:", err);
      }
    };

    fetchUserName();
    if (user._id) {
      fetchHireRequests();
    }
  }, [email, user._id]);

  const handleRequestResponse = async (response) => {
    try {
      const requestId = selectedRequest._id;
      await axios.post("http://localhost:4000/api/v1/respondHireRequest", {
        requestId,
        response,
      });
      setHireRequests(hireRequests.filter((req) => req._id !== requestId));
      setSelectedRequest(null);
      alert(`You have ${response}ed the hire request.`);
    } catch (err) {
      console.error("Error responding to hire request:", err);
      alert("Failed to respond to the hire request.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      <div className="absolute top-4 right-4 flex items-center">
        <div className="relative">
          <FaBell
            className={`text-2xl cursor-pointer ${
              newRequest ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => {
              if (hireRequests.length > 0) {
                setSelectedRequest(hireRequests[0]);
                setNewRequest(false);
              }
            }}
          />
          {hireRequests.length > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {hireRequests.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500">
          <img
            src={user.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {user.name || "N/A"}
          </h2>
          <p className="text-gray-500 text-sm">
            {user.personalDescription || "No description available"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm">
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p className="text-sm">
          <strong>Phone:</strong> {user.phoneNo || "N/A"}
        </p>
      </div>

      {selectedRequest && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Hire Request</h3>
          <p
            className="text-sm text-gray-700 truncate hover:overflow-visible hover:whitespace-normal"
            title={selectedRequest.message}
          >
            {selectedRequest.message}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => handleRequestResponse("accept")}
              className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => handleRequestResponse("reject")}
              className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-gray-200 p-4 rounded-lg">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-3 gap-3">
          {user.skills.length > 0 ? (
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
    </div>
  );
};

export default ProfileCard;
