import React from "react";
import { motion } from "framer-motion";

const Services = ({ id }) => {
  const purposes = [
    {
      title: "Talent Registration",
      description:
        "Allow talents to register and create profiles on the platform. Talents should be able to add their personal details, skills, and work experience. The registration process should be simple, intuitive, and require only essential information to get started.",
    },
    {
      title: "Skill Showcasing",
      description:
        "Enable talents to showcase their skills and portfolios. Talents should have the option to upload projects, certificates, and work samples. The platform should support multimedia content, such as images, videos, and documents, to give talents the ability to effectively present their work.",
    },
    {
      title: "Admin Approval",
      description:
        "Ensure quality by implementing an admin approval process for talent registrations. Admins should review talent profiles before they go live on the platform. This process helps in maintaining high standards of professionalism and authenticity in the community.",
    },
    {
      title: "Client Browsing",
      description:
        "Allow clients to browse through talent profiles and filter based on skills, experience, and other criteria. The browsing experience should be user-friendly, with easy navigation, profile previews, and search functionality to find the right talent for their needs.",
    },
    {
      title: "Hire Requests",
      description:
        "Facilitate clients to send hire requests directly to talents. Clients should be able to message and request to hire talent directly through the platform. This process should be simple, transparent, and enable clear communication between both parties.",
    },
    {
      title: "Scalable and Efficient",
      description:
        "Design the talent module to be scalable and efficient. The solution should handle a growing number of users, talents, and clients without compromising performance. The system should be optimized for fast loading times, responsiveness, and seamless functionality across devices.",
    },
  ];

  return (
    <div id={id} className="relative">
      <img
        src="/images/Services-img.png"
        alt="background image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>

      <motion.h3 className="text-5xl font-bold text-center mb-5 pt-20 text-orange-500 opacity-75">
        Our Services
      </motion.h3>

      <div className="flex flex-wrap justify-center gap-14  p-9">
        {purposes.map((purpose, index) => (
          <motion.div
            key={index}
            className="purpose-section max-w-xs w-1/3 rounded overflow-hidden shadow-lg border bg-white opacity-75 transition-all duration-500 transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{
              duration: 0.8,
              delay: 0.2 + index * 0.2,
              type: "spring",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            <div
              className={`bg-orange-500 h-16 relative flex justify-center items-center shadow-2xl border-orange-500`}
            >
              <h3 className="text-xl font-semibold text-white">
                {purpose.title}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{purpose.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
