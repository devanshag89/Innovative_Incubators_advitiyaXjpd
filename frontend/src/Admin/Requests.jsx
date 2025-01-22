import React, { useEffect, useState } from "react";

const CandidateCard = ({ candidate, onApprove, onReject }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-center">
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={candidate.profilePhoto || "https://via.placeholder.com/150"}
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
        <p className="text-sm text-gray-500">
          {candidate.email || "No email provided"}
        </p>
        <p className="text-sm text-gray-500">
          {candidate.phoneNo || "No phone number provided"}
        </p>
      </div>

      <div className="mt-6 flex flex-rol gap-3 ml-20">
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
        const response = await fetch(
          "http://localhost:4000/api/v1/get-pending-talents"
        );
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
      const response = await fetch(
        "http://localhost:4000/api/v1/approve-talent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ talentId: id }),
        }
      );

      if (response.ok) {
        setCandidates((prev) =>
          prev.filter((candidate) => candidate._id !== id)
        );
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
      const response = await fetch(
        "http://localhost:4000/api/v1/reject-talent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ talentId: id }),
        }
      );

      if (response.ok) {
        setCandidates((prev) =>
          prev.filter((candidate) => candidate._id !== id)
        );
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
