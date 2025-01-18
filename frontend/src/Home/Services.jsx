import React from "react";

const Services = ({ id }) => {
  const purposes = [
    {
      title: "Talent Registration",
      description:
        "Allow talents to register and create profiles on the platform. Talents should be able to add their personal details, skills, and work experience. The registration process should be simple, intuitive, and require only essential information to get started.",
      color: "bg-blue-500",
      image: "/images/talent-1.png",
    },
    {
      title: "Skill Showcasing",
      description:
        "Enable talents to showcase their skills and portfolios. Talents should have the option to upload projects, certificates, and work samples. The platform should support multimedia content, such as images, videos, and documents, to give talents the ability to effectively present their work.",
      color: "bg-yellow-500",
      image: "/images/talent-2.png",
    },
    {
      title: "Admin Approval",
      description:
        "Ensure quality by implementing an admin approval process for talent registrations. Admins should review talent profiles before they go live on the platform. This process helps in maintaining high standards of professionalism and authenticity in the community.",
      color: "bg-gray-500",
      image: "/images/talent-3.png",
    },
    {
      title: "Client Browsing",
      description:
        "Allow clients to browse through talent profiles and filter based on skills, experience, and other criteria. The browsing experience should be user-friendly, with easy navigation, profile previews, and search functionality to find the right talent for their needs.",
      color: "bg-green-500",
      image: "/images/talent-4.png",
    },
    {
      title: "Hire Requests",
      description:
        "Facilitate clients to send hire requests directly to talents. Clients should be able to message and request to hire talent directly through the platform. This process should be simple, transparent, and enable clear communication between both parties.",
      color: "bg-purple-500",
      image: "/images/talent-5.png",
    },
    {
      title: "Scalable and Efficient",
      description:
        "Design the talent module to be scalable and efficient. The solution should handle a growing number of users, talents, and clients without compromising performance. The system should be optimized for fast loading times, responsiveness, and seamless functionality across devices.",
      color: "bg-red-600",
      image: "/images/talent-6.png",
    },
  ];

  return (
    <div id={id}>
      <h3 className="text-5xl font-bold justify-center text-center mb-5 pt-20">
        Our Services
      </h3>
      <div className="flex flex-wrap justify-center gap-14 m-2 p-9">
        {purposes.map((purpose, index) => (
          <div
            key={index}
            className="purpose-section max-w-xs w-1/3 rounded overflow-hidden shadow-lg border border-gray-200 opacity-75 transition-all duration-500"
          >
            <div
              className={`${purpose.color} h-16 relative flex justify-center items-center`}
            >
              <h3 className="text-lg font-bold ">{purpose.title}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 ">{purpose.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
