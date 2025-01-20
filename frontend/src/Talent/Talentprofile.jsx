import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/TalentContext";
import axios from "axios";
const CompleteProfile = () => {

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
        const response = await axios.get("http://localhost:4000/api/v1/gettalenttalent", {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
      setProfilePreview(URL.createObjectURL(file));
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
  
    // Ensure the necessary fields are filled out
    if (!formData.phone || !formData.bio || !formData.profilePicture || formData.selectedSubSkills.length === 0) {
      alert("Please fill out all fields and select at least one subcategory.");
      return;
    }
  
    try {
      // Prepare the payload to be sent to the backend
      const payload = {
        email: email, // Comes from useAuth()
        phone: formData.phone,
        bio: formData.bio,
        profilePicture: formData.profilePicture, // Profile picture URL
        selectedSubSkills: formData.selectedSubSkills,
      };
  
      // Send the data to the backend API
      const response = await axios.post("http://localhost:4000/api/v1/addtalent", payload, {
        headers: {
          Authorization: `Bearer ${token}`, // If token-based authentication is used
        },
      });
  
      // Handle success response
      if (response.status === 200) {
        alert("Profile Updated Successfully!");
        console.log("Updated User Data:", response.data.user); // Optional: log updated user info
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile. Please try again later.");
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-300 p-8">
      {/* Left Section */}
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg lg:w-1/3">
        <div className="relative w-32 h-32">
          <img
            src={
              profilePreview ||
              "https://via.placeholder.com/150?text=Profile+Picture"
            }
            alt="Profile Preview"
            className="rounded-full w-full h-full object-cover border border-gray-300"
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-blue-500 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600"
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
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg lg:w-2/3 mt-6 lg:mt-0 lg:ml-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Complete Your Profile</h1>
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              <h2 className="text-lg font-semibold mb-2">
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
                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2"
                  >
                    <span>{subSkill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovesubSkill(subSkill)}
                      className="text-red-500 hover:text-red-700 ml-2"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
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
