import React from "react";

const About = ({id}) => {
  return (
    <section className="bg-white py-12 overflow-x-hidden" id={id}>
        
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center ml-5">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-5xl font-bold text-purple-900 mb-4">About Us</h2>
          <p className="text-gray-600 mb-6">
          At JPD Hub, we are dedicated to empowering talent discovery and providing client-centric solutions. Our platform enables talented individuals to easily register, showcase their skills, and connect with potential clients in a streamlined and professional manner. We focus on offering clients a seamless experience, allowing them to browse, filter, and hire top talent while ensuring quality through an efficient admin approval system. Built with scalability and security in mind, our solutions feature responsive designs and robust notification systems, providing the foundation for future growth and user convenience.</p>
          <button className="bg-purple-400 text-white py-2 px-6 rounded hover:bg-purple-500">
            Learn More
          </button>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src="../images/about.png"
            alt="About Us Illustration"
            className="w-full rounded-lg "
          />
        </div>
      </div>
    </section>
  );
};

export default About;
