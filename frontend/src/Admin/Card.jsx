import React from "react";

const Card = () => {

    const skills = [
        { text: "12 positions", bg: "bg-gray-100", textColor: "text-gray-700" },
        { text: "Full Time", bg: "bg-red-100", textColor: "text-red-500" },
        { text: "14LPA", bg: "bg-purple-100", textColor: "text-purple-500" },
      ];
  return (
    <div className="max-w-sm bg-white shadow-2xl rounded-lg p-4 space-y-4">

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mt-2 -mb-1">
          <img
            src="../images/admin.png" 
            alt="Company Logo"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-900">Category</h3>
          <p className="text-gray-500 text-sm text-purple-900">Sub-category</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-purple-900">FullName</h2>
        <p className="text-gray-600 text-sm text-purple-900">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, quos!(personal description)
        </p>
      </div>

      
      <div className="flex space-x-4 text-sm">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`bg-purple-300 text-gray-700 px-3 py-1 rounded-full`}
          >
            {skill.text}
          </span>
        ))}
      </div>

      {/* <div className="flex space-x-4">
        <button className="flex-1 bg-purple-300 text-purple-700 py-2 rounded-lg font-semibold hover:bg-gray-300">
          Connect+
        </button>
        <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700">
          Hire
        </button>
      </div> */}
    </div>
  );
};

export default Card;
