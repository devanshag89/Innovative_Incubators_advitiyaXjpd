import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useInView } from 'react-intersection-observer'; // Import intersection observer hook

const Contact = ({ id }) => {
  // Hook to detect if the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once when it comes into view
    threshold: 0.5, // Trigger when 50% of the element is in the viewport
  });

  return (
    <div id={id} className="pt-20 bg-gray-300">
      <h3 className="text-5xl font-bold justify-center text-center -mb-12 text-orange-500">
        Contact Us
      </h3>
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div className="shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-5xl relative z-10">
          {/* Left Column: Image and Contact Info */}
          <motion.div
            ref={ref} // Attach intersection observer to this element
            className="md:w-1/2 p-6 flex flex-col justify-between relative bg-cover bg-center shadow-lg bg-black"
            style={{ backgroundImage: 'url(/images/Home-img.png)' }}
            initial={{ opacity: 0, x: -50 }} // Initial state
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}  // Animate when in view
            transition={{ duration: 0.8, type: "spring" }} // Animation settings
          >
            <div className="bg-black bg-opacity-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Location</h2>
              <p className="text-gray-200">
                123 Main Street, City, Country Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quo!
              </p>
            </div>
            <div className="mt-6 bg-black bg-opacity-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Phone</h2>
              <p className="text-gray-200">+123 456 7890</p>
              <p className="text-gray-200">+123 456 7890</p>
              <p className="text-gray-200">+123 456 7890</p>
            </div>
            <div className="mt-6 bg-black bg-opacity-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-white">Hours</h2>
              <p className="text-gray-200">Mon - Fri: 9 AM - 5 PM</p>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            ref={ref} // Attach intersection observer to this element
            className="p-6 bg-white md:w-1/2"
            initial={{ opacity: 0, x: 50 }} // Initial state
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}  // Animate when in view
            transition={{ duration: 0.8, type: "spring" }} // Animation settings
          >
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
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
