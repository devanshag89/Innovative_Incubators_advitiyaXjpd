import React from "react";

const ProfileCard = () => {
  const skills = ["HTML", "CSS", "JavaScript", "MERN", "Node.js"];

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            <img src="./images/hero_banner.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">FullName</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicinum eaque alias similique dicta sit.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <span className="material-icons mr-2">email</span>
          <p>shivani@gmail.com</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-2 space-x-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full shadow-sm"
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
