import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center">
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={candidate.profilePic || "https://via.placeholder.com/150"}
          className="w-full h-full rounded-full object-cover border-4 border-orange-400 shadow-md"
        />
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-black">
        {candidate.name || "Unknown"}
      </h3>

      <p className="mt-4 text-sm text-black">
        {candidate.personalDescription ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est et velit ornare ultrices."}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {candidate.skills?.length > 0 ? (
          candidate.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-200 text-black text-sm font-semibold rounded-full"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-sm text-black">No skills listed</span>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">{candidate.email || "No email provided"}</p>
        <p className="text-sm text-gray-500">{candidate.phoneNo || "No phone number provided"}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to={`/messagebox/${candidate._id}`}
          className="w-full py-2 text-white text-xl bg-orange-500 rounded-md text-center hover:bg-orange-600 transition"
        >
          View Profile
        </Link>
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
        const response = await fetch("http://localhost:4000/api/v1/get-approved-talents");
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
