import React from "react";
import { useEffect,useState } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";

const ProfileCard = () => {
  const skills = ["raam","shyanm"];

  const [user,setUser] = useState();

  const {email} = useAuth();
  console.log(email);

  useEffect(() => {
    // Function to fetch user name by email
    const fetchUserName = async () => {

      try {
        const response = await axios.get("http://localhost:4000/api/v1/gettalent", {
          params: {
            email: email,  // Pass email as a query parameter
          },
        });
        console.log(response.data);
        setUser(response.data.talent); // Set the user's name in the state
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserName();
  }, [email]);

  console.log(user);


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
          <h2 className="text-xl font-bold text-gray-800">name</h2>
          <p className="text-gray-500 text-sm">
            discription
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-4">
        <div className="flex items-center text-gray-700">
          <span className="material-icons mr-2 text-gray-500">email</span>
          <p className="text-sm">email</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-semibold">Skills</h3>
        <div className="flex flex-wrap mt-3 gap-3">
          {skills.map((skill, index) => (
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
