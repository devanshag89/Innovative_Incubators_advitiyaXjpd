import React from "react";

const TalentCard = ({ talent }) => {
  const handleSaveForLater = () => {
    alert(`You saved ${talent.name} for later!`);
    // Add your "save for later" logic here
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
      
      {/* Description */}
      <p className="mt-4 text-sm text-black">
        {talent.personalDescription ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est et velit ornare ultrices."}
      </p>

      {/* Skills Section */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {talent.skills?.length > 0 ? (
          talent.skills.map((skill, index) => (
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

      {/* Action Button */}
      <button
        onClick={handleSaveForLater}
        className="mt-6 w-full py-1  text-white text-xl bg-orange-500 rounded-md hover:bg-orange-600 transition"
      >
        Hire
      </button>
    </div>
  );
};

export default TalentCard;
