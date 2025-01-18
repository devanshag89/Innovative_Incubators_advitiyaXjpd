import React, { useEffect } from 'react'

const Contact = ({id}) => {
  return (
    <div id={id} className="bg-lime-200 pt-20">
    <h3 className="text-5xl font-bold justify-center text-center -mb-7">
        Contact Us
      </h3>
    <div className="min-h-screen bg-lime-200 flex items-center justify-center  " >
    
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Section */}
        <div className="p-6 bg-lime-300 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <p className="text-gray-700">123 Main Street, City, Country Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quo!</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Phone</h2>
            <p className="text-gray-700">+123 456 7890</p>
            <p className="text-gray-700">+123 456 7890</p>
            <p className="text-gray-700">+123 456 7890</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Hours</h2>
            <p className="text-gray-700">Mon - Fri: 9 AM - 5 PM</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 bg-white md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Form</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium">
                Comment or message
              </label>
              <textarea
                id="message"
                placeholder="Enter your message"
                rows="4"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact
