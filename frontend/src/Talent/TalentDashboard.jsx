
import React, { useState, useEffect } from "react";
import axios from "axios";
import TalentNavbar from "./TalentNavbar";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../contexts/TalentContext";


const TalentDashboard = () => {
  const { email, token } = useAuth(); // Get user email and token from auth context
  const [media, setMedia] = useState({ skillVideos: [], posts: [] }); // State to store media
  const [uploadType, setUploadType] = useState(""); // Media type (video or post)
  const [file, setFile] = useState(null); // File to upload

  // Fetch media on component mount
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/getMedia", {
          params: { email },
        });
        setMedia(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, [email]);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !uploadType) {
      alert("Please select a file and upload type (video or post).");
      return;
    }

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ShowCaseX"); // Your Cloudinary upload preset
      formData.append("cloud_name", "dmxznaplt"); // Your Cloudinary cloud name

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dmxznaplt/upload",
        formData
      );

      const mediaUrl = cloudinaryResponse.data.secure_url;

      // Save media URL to the backend
      const saveResponse = await axios.post(
        "http://localhost:4000/api/v1/saveMedia",
        {
          email,
          mediaUrl,
          type: uploadType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(saveResponse.data.message);

      // Update the media state
      setMedia((prevMedia) => ({
        ...prevMedia,
        [uploadType === "video" ? "skillVideos" : "posts"]: [
          ...prevMedia[uploadType === "video" ? "skillVideos" : "posts"],
          mediaUrl,
        ],
      }));

      setFile(null); // Reset file input
      setUploadType(""); // Reset upload type
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  

  return (
    <>
      <TalentNavbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <main className="container mx-auto p-6">
          {/* Profile and Actions Section */}
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Card */}
            <ProfileCard/>

            {/* File Upload Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Upload Media</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Select Media Type:
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="video">Video</option>
                  <option value="post">Post</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Choose File:</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </section>

          {/* Media Display Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Videos */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Skill Videos</h2>
              {media.skillVideos.length > 0 ? (
                <ul className="space-y-4">
                  {media.skillVideos.map((video, idx) => (
                    <li key={idx}>
                      <video
                        controls
                        src={video}
                        className="w-full rounded-lg shadow-lg"
                      ></video>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No videos uploaded yet.</p>
              )}
            </div>

            {/* Posts */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Posts</h2>
              {media.posts.length > 0 ? (
                <ul className="space-y-4">
                  {media.posts.map((post, idx) => (
                    <li key={idx}>
                      <img
                        src={post}
                        alt={`Post ${idx + 1}`}
                        className="w-full rounded-lg shadow-lg"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No posts uploaded yet.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TalentDashboard;
