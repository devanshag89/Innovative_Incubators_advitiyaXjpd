import React from "react";

const ProfileCard = ({user}) => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src=""
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">
            {user.personalDescription}
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <span className="material-icons mr-2 text-gray-500">email</span>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-3 gap-3">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-full shadow-sm hover:bg-gray-200 transition duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
