import React, { useEffect, useState } from "react";

const CandidateCard = ({ candidate }) => {
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
    </div>
  );
};

const ApprovedTalentsList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovedTalents = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/get-approved-talents"); // Replace with your actual backend endpoint
        const data = await response.json();

        if (response.ok) {
          setCandidates(data.talents);
        } else {
          setError(data.message || "Failed to fetch approved talents");
        }
      } catch (err) {
        setError("An error occurred while fetching approved talents");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedTalents();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading approved talents...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate._id} candidate={candidate} />
      ))}
    </div>
  );
};

export default ApprovedTalentsList;
