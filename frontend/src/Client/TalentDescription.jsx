import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TalentDescription = () => {
  const location = useLocation();
  const { talent } = location.state || {};
  const [media, setMedia] = useState({ skillVideos: [], posts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        if (!talent?.email) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:4000/api/v1/getMedia?email=${talent.email}`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setMedia({
            skillVideos: data.skillVideos || [],
            posts: data.posts || [],
          });
        } else {
          console.error("Error fetching media:", data.message);
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [talent]);

  if (!talent) {
    return (
      <div
        className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url('../images/Home-img.png')`,
          height: "500px",
          width: "500px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl z-10">
          <div className="text-2xl font-semibold text-gray-500">
            No talent data found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center relative py-10 px-6"
      style={{
        backgroundImage: `url('../images/Home-img.png')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="max-w-4xl w-full bg-black bg-opacity-50 shadow-lg rounded-lg p-8 z-10 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-orange-200 overflow-hidden shadow-md animate-bounce">
            <img
              src={talent.profilePhoto || "/default-profile.png"}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-orange-700 animate-slideInDown">
            {talent.name || "Unknown Talent"}
          </h1>
          <p className="mt-2 text-white text-lg">
            {talent.description ||
              "This talent does not have a description yet."}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4 animate-slideInLeft">
            Personal Description
          </h2>
          <p className="text-white">
            {talent.personalDescription ||
              "No personal description available for this talent."}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4 animate-slideInLeft">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {talent.skills?.length > 0 ? (
              talent.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-orange-100 text-orange-800 font-medium rounded-full text-sm animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-600">No skills listed.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4 animate-slideInRight">
            Posts
          </h2>
          {loading ? (
            <p className="text-white">Loading media...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {media.skillVideos.map((videoUrl, index) => (
                <video
                  key={`video-${index}`}
                  controls
                  className="rounded-lg shadow-md animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ))}

              {media.posts.map((postUrl, index) => (
                <img
                  key={`post-${index}`}
                  src={postUrl}
                  alt={`Post ${index + 1}`}
                  className="rounded-lg shadow-md animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}

              {media.skillVideos.length === 0 && media.posts.length === 0 && (
                <p className="text-white">No media available.</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4 animate-slideInRight">
            Contact Information
          </h2>
          <p className="text-white">
            <strong>Email:</strong> {talent.email || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TalentDescription;
