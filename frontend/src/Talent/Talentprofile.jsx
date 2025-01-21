import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CompleteProfile = () => {
  const navigate = useNavigate();
  const {email,token} = useAuth();

  const [SelectedSkills, setSelectedSkills] = useState(""); // Tracks the currently selected category
  const [profilePreview, setProfilePreview] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    // Function to fetch user name by email
    const fetchUserName = async () => {
      if (!email) {
        setError("Email not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/v1/gettalent", {
          params: {
            email: email,  // Pass email as a query parameter
          },
        });
        console.log(response.data);
        setName(response.data.talent.name); // Set the user's name in the state
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [email]);


  const [formData, setFormData] = useState({
    userEmail: email,
    phone: "",
    bio: "",
    profilePicture: null,
    selectedSubSkills: [], // Track selected subcategories globally
  });

  const categories = {
    "Creative Talents": [
      "Artists",
      "Photographers",
      "Musicians",
      "Writers",
      "Designers",
      "Dancers",
      "Actors/Actresses",
      "Filmmakers/Directors",
      "Animators",
      "Voiceover Artists",
    ],
    "Technology & Programming Talents": [
      "Software Developers",
      "Web Developers",
      "Mobile App Developers",
      "Game Developers",
      "Data Scientists",
      "Machine Learning Engineers",
      "Cloud Engineers",
      "Blockchain Developers",
      "Cybersecurity Experts",
      "Database Administrators",
      "AI Specialists",
    ],
    "Business & Marketing Talents": [
      "Entrepreneurs",
      "Sales Experts",
      "Digital Marketers",
      "SEO/SEM Specialists",
      "Content Creators/Managers",
      "Brand Strategists",
      "Public Relations Experts",
      "Product Managers",
      "Event Planners",
      "Business Analysts",
      "Project Managers",
    ],
    "Academic & Educational Talents": [
      "Teachers/Instructors",
      "Tutors",
      "Research Scientists",
      "Academic Writers",
      "Online Course Creators",
      "Language Experts/Translators",
      "Curriculum Developers",
    ],
    "Healthcare & Medical Talents": [
      "Doctors",
      "Nurses",
      "Therapists",
      "Nutritionists",
      "Personal Trainers",
      "Pharmacists",
      "Medical Researchers",
      "Mental Health Professionals",
    ],
    "Culinary & Hospitality Talents": [
      "Chefs",
      "Bakers",
      "Caterers",
      "Food Stylists",
      "Bartenders",
      "Hospitality Managers",
      "Event Catering",
    ],
    "Sports & Fitness Talents": [
      "Athletes",
      "Coaches",
      "Yoga Instructors",
      "Pilates Instructors",
      "Sports Commentators",
      "Fitness Influencers",
    ],
    "Crafts & Handicrafts Talents": [
      "Crafters",
      "Jewelry Designers",
      "Tailors/Seamstresses",
      "Leatherworkers",
      "Florists",
      "Interior Designers",
    ],
    "Public Service & Advocacy Talents": [
      "Activists",
      "Lawyers",
      "Non-profit Workers",
      "Social Workers",
      "Community Leaders",
      "Advocacy Writers",
    ],
    "Finance & Accounting Talents": [
      "Accountants",
      "Financial Advisors",
      "Investment Analysts",
      "Tax Specialists",
      "Auditors",
      "Risk Management Experts",
    ],
    "Fashion & Beauty Talents": [
      "Fashion Designers",
      "Stylists",
      "Makeup Artists",
      "Hair Stylists",
      "Nail Artists",
      "Cosmetic Surgeons",
      "Photographers (Fashion)",
      "Beauty Influencers",
    ],
    "Legal & Compliance Talents": [
      "Lawyers",
      "Paralegals",
      "Compliance Officers",
      "Legal Advisors",
      "Contract Specialists",
    ],
    "Engineering Talents": [
      "Mechanical Engineers",
      "Electrical Engineers",
      "Civil Engineers",
      "Chemical Engineers",
      "Aerospace Engineers",
      "Automotive Engineers",
      "Industrial Engineers",
      "Environmental Engineers",
    ],
    "Social Media & Content Creation Talents": [
      "Influencers",
      "Vloggers",
      "Content Writers/Bloggers",
      "Podcasters",
      "Streamers",
    ],
    "Tech Support & Customer Service Talents": [
      "IT Support Specialists",
      "Customer Service Representatives",
      "Helpdesk Technicians",
      "Product Support Experts",
      "Chat Support Professionals",
    ],
    "Sales & Customer Relationship Talents": [
      "Sales Executives",
      "Account Managers",
      "Customer Relationship Managers",
      "Business Development Representatives",
    ],
    "Engineering Design & Architecture Talents": [
      "Architects",
      "Urban Planners",
      "Interior Designers",
      "Construction Managers",
    ],
    "Media & Journalism Talents": [
      "Journalists",
      "Editors",
      "News Anchors",
      "Content Creators (Video/Audio)",
      "Public Speakers",
      "Documentary Filmmakers",
    ],
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ShowCaseX"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "dmxznaplt"); // Replace with your Cloudinary cloud name
  
      try {
        // Upload the image to Cloudinary
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dmxznaplt/image/upload",
          formData
        );
  
        // Get the uploaded image URL
        const imageUrl = response.data.secure_url;
  
        // Update the formData state with the image URL
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: imageUrl, // Store the URL in state
        }));
  
        // Set the preview image
        setProfilePreview(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };
  

  const handleCategoryChange = (e) => {
    setSelectedSkills(e.target.value);
  };

  const handlesubSkillChange = (subSkill) => {
    setFormData((prevData) => {
      const selectedSubSkills = [...prevData.selectedSubSkills];

      // Toggle the subSkill
      if (selectedSubSkills.includes(subSkill)) {
        return {
          ...prevData,
          selectedSubSkills: selectedSubSkills.filter(
            (item) => item !== subSkill
          ),
        };
      } else {
        return {
          ...prevData,
          selectedSubSkills: [...selectedSubSkills, subSkill],
        };
      }
    });
  };

  const handleRemovesubSkill = (subSkill) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedSubSkills: prevData.selectedSubSkills.filter(
        (item) => item !== subSkill
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.phone || !formData.bio || !formData.profilePicture || formData.selectedSubSkills.length === 0) {
      alert("Please fill out all fields and select at least one subcategory.");
      return;
    }
  
    try {
      const payload = {
        email, // Comes from useAuth()
        phone: formData.phone,
        bio: formData.bio,
        profilePicture: formData.profilePicture,
        selectedSubSkills: formData.selectedSubSkills,
      };
  
      const response = await axios.post("http://localhost:4000/api/v1/addtalent", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200 && response.data.isProfileComplete) {
        alert("Profile Updated Successfully!");
        console.log("Updated User Data:", response.data.user);
        navigate("/talent-dashboard"); // Navigate only if the profile is complete
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile. Please try again later.");
    }
  };
  

  return (

     <div
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-orange-200 to-orange-300 p-8"
      style={{
        backgroundImage: `url("/images/Services-img.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: "0.9",
      }}
    > <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="flex flex-col items-center p-6 bg-gray-200 rounded-lg shadow-lg lg:w-1/3 opacity-90">
        <div className="relative w-32 h-32">
          <img
            src={
              profilePreview ||
              "https://via.placeholder.com/150?text=Profile+Picture"
            }
            alt=""
            className="rounded-full w-full h-full object-cover border border-gray-700"
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-orange-500 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600"
          >
            +
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-gray-700">{email}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-6 bg-gray-200 rounded-lg shadow-lg lg:w-2/3 mt-6 lg:mt-0 lg:ml-6 opacity-90">
        <h1 className="text-2xl font-bold mb-4 text-center text-orange-600">Complete Your Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Talent Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={SelectedSkills}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategories for Selected Category */}
          {SelectedSkills && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Subcategories for {SelectedSkills}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {categories[SelectedSkills].map((subSkill) => (
                  <label key={subSkill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={subSkill}
                      checked={formData.selectedSubSkills.includes(
                        subSkill
                      )}
                      onChange={() => handlesubSkillChange(subSkill)}
                    />
                    <span>{subSkill}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Display Selected Subcategories */}
          {formData.selectedSubSkills.length > 0 && (
            <div className="mb-4">
              <h2 className="text-gray-700 mb-2">Selected Subcategories:</h2>
              <div className="flex flex-wrap gap-2">
                {formData.selectedSubSkills.map((subSkill) => (
                  <span
                    key={subSkill}
                    className="bg-orange-200 text-orange-600 px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span>{subSkill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovesubSkill(subSkill)}
                      className="text-orange-500 hover:text-orange-700 ml-2"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 mb-2">
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell us a little about yourself"
              rows="3"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
