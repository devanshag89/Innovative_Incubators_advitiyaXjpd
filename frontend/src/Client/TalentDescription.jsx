import React from "react";
import { useLocation } from "react-router-dom";

const TalentDescription = () => {
  const location = useLocation();
  const { talent } = location.state || {}; // Retrieve talent from state

  if (!talent) {
    return <div>No talent found.</div>;
  }

  return (
    <div className="talent-description-container">
      <h1 className="text-4xl font-bold">{talent.name}</h1>
      <p className="text-lg mt-4">{talent.description}</p>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <ul>
          {talent.skills.map((skill, index) => (
            <li key={index} className="text-lg">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TalentDescription;
