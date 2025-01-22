import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center">
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={candidate.profilePic}
          alt={candidate.name || "Profile"}
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

      {/* Add the View Profile button */}
      <div className="mt-6 flex flex-col gap-3">
        <Link
          to={`/messagebox/${candidate._id}`} // Adjust the route as needed
          className="w-full py-2 text-white text-xl bg-orange-500 rounded-md text-center hover:bg-orange-600 transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default CandidateCard;
