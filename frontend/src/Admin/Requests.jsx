import React, { useEffect, useState } from "react";

const CandidateCard = ({ candidate, onApprove, onReject }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md max-w-sm mx-auto p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={candidate.profilePic || "https://via.placeholder.com/150"} // Default profile picture if none is provided
          alt={`${candidate.name}'s profile`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{candidate.name}</h2>
          <p className="text-sm text-gray-500">{candidate.email}</p>
          <p className="text-sm text-gray-500">{candidate.phoneNo}</p>
        </div>
      </div>
      <p className="text-gray-700">
        <span className="font-medium">Description:</span> {candidate.personalDescription}
      </p>
      <div>
        <h3 className="font-medium text-gray-800">Skills:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {candidate.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onApprove(candidate._id)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(candidate._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

const RequestCandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/get-pending-talents"); // Replace with your actual backend endpoint
        const data = await response.json();

        if (response.ok) {
          setCandidates(data.talents);
        } else {
          setError(data.message || "Failed to fetch candidates");
        }
      } catch (err) {
        setError("An error occurred while fetching candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/approve-talent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ talentId: id }), // Send the talentId in the request body
      });
  
      if (response.ok) {
        // Remove the approved candidate from the local state
        setCandidates((prev) => prev.filter((candidate) => candidate._id !== id));
        alert("Talent approved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error approving talent: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error approving talent:", err);
      alert("An error occurred while approving the talent.");
    }
  };
  
  const handleReject = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/reject-talent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ talentId: id }), // Send the talentId in the request body
      });
  
      if (response.ok) {
        // Remove the rejected candidate from the local state
        setCandidates((prev) => prev.filter((candidate) => candidate._id !== id));
        alert("Talent rejected successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error rejecting talent: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error rejecting talent:", err);
      alert("An error occurred while rejecting the talent.");
    }
  };
  

  if (loading) {
    return <p className="text-center mt-8">Loading candidates...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate._id}
          candidate={candidate}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default RequestCandidateList;
