import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa"; // Importing icons for accept and reject

const ProfileCard = () => {
  const [user, setUser] = useState({ skills: [], hireRequest: null });
  const [hireRequests, setHireRequests] = useState([]); // Store hire requests
  const [selectedRequest, setSelectedRequest] = useState(null); // Selected request for detailed view
  const { email } = useAuth();

  useEffect(() => {
    // Fetch user data
    const fetchUserName = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/gettalent", {
          params: { email },
        });
        setUser(response.data.talent);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    // Fetch hire requests for the talent
    const fetchHireRequests = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/getHireRequests", {
          params: { talentId: user._id }, // Use actual talent ID
        });
        setHireRequests(response.data.requests);
      } catch (err) {
        console.error("Error fetching hire requests:", err);
      }
    };

    fetchUserName();
    if (user._id) {
      fetchHireRequests();
    }
  }, [email, user._id]);

  // Handle hire request response (accept/reject)
  const handleRequestResponse = async (response) => {
    try {
      const requestId = selectedRequest._id; // Use the selected request ID
      await axios.post("http://localhost:4000/api/v1/respondHireRequest", {
        requestId,
        response,
      });
      setHireRequests(hireRequests.filter((req) => req._id !== requestId));
      setSelectedRequest(null); // Close the detailed view
      alert(`You have ${response}ed the hire request.`);
    } catch (err) {
      console.error("Error responding to hire request:", err);
      alert("Failed to respond to the hire request.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
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
        <p className="text-sm"><strong>Email:</strong> {user.email || "N/A"}</p>
        <p className="text-sm"><strong>Phone:</strong> {user.phoneNo || "N/A"}</p>
      </div>

      {/* Hire Request Notification */}
      <div className="fixed top-10 right-5 bg-blue-500 text-white p-4 rounded shadow-md">
        {hireRequests.length > 0 && (
          <>
            <p>{hireRequests.length} new hire request(s)</p>
            <button
              className="mt-2 underline"
              onClick={() => setSelectedRequest(hireRequests[0])}
            >
              View Request
            </button>
          </>
        )}
      </div>

      {/* Detailed Hire Request */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold">{selectedRequest.clientName}</h2>
            <p>{selectedRequest.message}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleRequestResponse("accept")}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                <FaCheck className="mr-2" /> Accept
              </button>
              <button
                onClick={() => handleRequestResponse("reject")}
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
              >
                <FaTimes className="mr-2" /> Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-3 gap-3">
          {user.skills.length > 0 ? (
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
