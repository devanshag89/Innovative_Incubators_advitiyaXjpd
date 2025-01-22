import React, { useState, useEffect } from "react";
import axios from "axios";
import TalentNavbar from "./TalentNavbar";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../contexts/TalentContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdUpload } from "react-icons/md";

const TalentDashboard = () => {
  const { email, token } = useAuth();
  const [media, setMedia] = useState({ skillVideos: [], posts: [] });
  const [uploadType, setUploadType] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getMedia",
          {
            params: { email },
          }
        );
        setMedia(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };
    fetchMedia();
  }, [email]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !uploadType) {
      alert("Please select a file and upload type.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ShowCaseX");
      formData.append("cloud_name", "dmxznaplt");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dmxznaplt/upload",
        formData
      );

      const mediaUrl = cloudinaryResponse.data.secure_url;

      const saveResponse = await axios.post(
        "http://localhost:4000/api/v1/saveMedia",
        { email, mediaUrl, type: uploadType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(saveResponse.data.message);

      setMedia((prev) => ({
        ...prev,
        [uploadType === "video" ? "skillVideos" : "posts"]: [
          ...prev[uploadType === "video" ? "skillVideos" : "posts"],
          mediaUrl,
        ],
      }));

      setFile(null);
      setUploadType("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const handleDelete = async (type, url) => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/api/v1/deleteMedia",
        {
          data: { email, type, url },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);

        setMedia((prev) => ({
          ...prev,
          [type === "video" ? "skillVideos" : "posts"]: prev[
            type === "video" ? "skillVideos" : "posts"
          ].filter((item) => item !== url),
        }));
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media.");
    }
  };

  return (
    <>
      <TalentNavbar />
      <div
        className="min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/Services-img.png')",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        <main className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 py-10 px-6 relative z-10">
          <div className="space-y-6 mt-14">
            <ProfileCard />
            <div className="bg-gray-200 p-6 rounded-lg shadow backdrop-blur-md mt-10">
              <h2 className="text-xl font-bold mb-4">Showcase you talent</h2>
              <select
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="">Select Type</option>
                <option value="video">Video</option>
                <option value="post">Post</option>
              </select>

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded bg-white"
              />
              <button
                onClick={handleUpload}
                className="bg-orange-500 text-white px-4 py-2 rounded text-xl hover:bg-orange-600 flex items-center gap-2"
              >
                <MdUpload className="text-2xl" />
                Upload
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-14">
            {media.skillVideos.map((video, idx) => (
              <div
                key={idx}
                className="relative bg-black rounded-lg shadow-lg overflow-hidden group h-64"
              >
                <video
                  src={video}
                  controls
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDelete("video", video)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}

            {media.posts.map((post, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden group h-64"
              >
                <img
                  src={post}
                  alt={`Post ${idx}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDelete("post", post)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default TalentDashboard;
