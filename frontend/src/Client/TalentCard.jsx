import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useClient } from "../contexts/ClientContext";

const TalentCard = ({ talent }) => {
  const { clientEmail } = useClient();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (!clientEmail) {
      navigate("/client/login");
    } else {
      navigate(`/description/${talent._id}`, {
        state: { talent },
      });
    }
  };

  const handleHireRequest = async () => {
    console.log("clientEmail:", clientEmail);
    console.log("talentId:", talent._id);

    if (!clientEmail || !talent._id) {
      alert("Please log in first.");
      navigate("/client/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/sendHireRequest",
        {
          clientEmail,
          talentId: talent._id,
          message: "I'm interested in hiring you!",
        }
      );
      alert("Hire request sent successfully. Admin has been notified.");
    } catch (error) {
      console.error("Error sending hire request:", error);
      alert("Error sending hire request.");
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center">
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={talent.profilePhoto || "/default-profile.png"}
          alt={talent.name || "Profile"}
          className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
        />
      </div>

      <h3 className="mt-4 text-2xl font-semibold text-black">
        {talent.name || "Unknown"}
      </h3>

      <p className="mt-4 text-sm text-black">
        {talent.personalDescription ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est et velit ornare ultrices."}
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {talent.skills?.length > 0 ? (
          talent.skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="px-3 py-1 bg-orange-200 text-black text-sm font-semibold rounded-full"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-sm text-black">No skills listed</span>
        )}
      </div>

      <div className="mt-6 flex flex-row gap-3">
        <button
          onClick={handleViewProfile}
          className="w-full py-2 text-white text-xl bg-orange-500 rounded-md text-center hover:bg-orange-600 transition"
        >
          View Profile
        </button>

        <button
          onClick={handleHireRequest}
          className="w-full py-2 text-white text-xl bg-orange-500 rounded-md text-center hover:bg-orange-600 transition"
        >
          Hire
        </button>
      </div>
    </div>
  );
};

export default TalentCard;
