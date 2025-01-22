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
      const response = await axios.delete("http://localhost:4000/api/v1/deleteMedia", {
        data: { email, type, url },
        headers: { Authorization: `Bearer ${token}` },
      });

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
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-100 to-white">
        <main className="container mx-auto py-10 px-6">
          <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ProfileCard />
            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Upload Media</h2>
              <select
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
                className="w-full mb-4"
              >
                <option value="">Select Type</option>
                <option value="video">Video</option>
                <option value="post">Post</option>
              </select>
              <input type="file" onChange={handleFileChange} className="w-full mb-4" />
              <button onClick={handleUpload} className="bg-purple-500 text-white px-4 py-2 rounded">
                <MdUpload /> Upload
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {media.skillVideos.map((video, idx) => (
    <div
      key={idx}
      className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-purple-200 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all"
    >
      <video
        src={video}
        controls
        className="w-full h-52 object-cover rounded-t-3xl"
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
      className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-purple-200 overflow-hidden group hover:shadow-2xl hover:scale-105 transition-all"
    >
      <img
        src={post}
        alt={`Post ${idx}`}
        className="w-full h-52 object-cover rounded-t-3xl"
      />
      <button
        onClick={() => handleDelete("post", post)}
        className="absolute top-3 right-3 bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
      >
        <FaTrashAlt />
      </button>
    </div>
  ))}
</section>

        </main>
      </div>
    </>
  );
};

export default TalentDashboard;
