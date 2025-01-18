import React, { useState } from "react";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe", // Default name
    email: "johndoe@example.com", // Default email
    phone: "",
    bio: "",
    profilePicture: null,
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    category: "",
    subCategory: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const categories = {
    "Creative Talents": [
      "Artists",
      "Photographers",
      "Musicians",
      "Writers",
      "Designers",
      "Dancers",
      "Actors/Actresses",
    ],
    "Technology & Programming Talents": [
      "Software Developers",
      "Web Developers",
      "Mobile App Developers",
      "Game Developers",
      "Data Scientists",
      "AI Specialists",
    ],
    // Add other categories and subcategories here...
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "postalCode"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profilePicture: file }));
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Profile Submitted!");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      {/* Left Section: Profile Picture and Basic Info */}
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg lg:w-1/3">
        {/* Profile Picture */}
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

        {/* Name and Email */}
        <div className="text-center mt-4">
          <h1 className="text-lg font-semibold">{formData.fullName}</h1>
          <p className="text-gray-600">{formData.email}</p>
        </div>
      </div>

      {/* Right Section: Form */}
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
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Address Fields */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              id="street"
              name="street"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street"
              required
            />
            <input
              type="text"
              id="city"
              name="city"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              id="state"
              name="state"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4 mt-4">
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Talent Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          {formData.category && (
            <div className="mb-4">
              <label htmlFor="subCategory" className="block text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                id="subCategory"
                name="subCategory"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.subCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select a subcategory</option>
                {categories[formData.category].map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
