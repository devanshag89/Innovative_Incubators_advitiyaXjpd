import React, { useState } from "react";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    profilePicture: null,
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const [profilePreview, setProfilePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if it's an address field
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
      setProfilePreview(URL.createObjectURL(file)); // Generate a preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Profile Submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Complete Your Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

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

          {/* Address Section */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Address</h2>
          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-700 mb-2">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Enter your street"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-gray-700 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address.postalCode}
              onChange={handleChange}
              placeholder="Enter your postal code"
              required
            />
          </div>

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
            ></textarea>
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="w-full"
              onChange={handleImageChange}
            />
            {profilePreview && (
              <div className="mt-4">
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  className="rounded-full w-24 h-24 object-cover mx-auto"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
