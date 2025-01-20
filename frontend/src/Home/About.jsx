import React from "react";

const About = ({id}) => {
  return (
    <section className="bg-gray-300 py-12 overflow-x-hidden " id={id}>
        
      <div className="container mx-auto px-6 py-10 ml-10 py-10">
        <div className="text-center lg:text-left">
          <h2 className="text-5xl font-bold text-orange-500 mb-4">About Us</h2>
          <p className="text-gray-600 mb-6 mr-14">
          At JPD Hub, we are committed to empowering talent discovery and providing client-centric solutions that meet the evolving needs of both individuals and businesses. Our platform is designed to help talented professionals easily register, create detailed profiles to showcase their unique skills and expertise, and connect with potential clients in a streamlined, efficient, and professional manner. We prioritize making the talent search process smooth and intuitive, offering clients a seamless experience where they can browse, filter, and hire top talent from a diverse pool of candidates. To ensure the highest standards of quality, we have implemented a robust admin approval system that carefully evaluates each profile before they are listed, guaranteeing that only the most qualified individuals are presented to clients. Our platform is built with scalability and security in mind, ensuring that it can grow alongside our user base while maintaining the integrity of data and user privacy. In addition to this, our solutions feature responsive designs, providing a user-friendly experience across devices, and a robust notification system that keeps both clients and talent informed in real-time. With these foundational elements in place, JPD Hub is poised to lead the way in talent discovery, supporting the future growth of professionals and businesses alike while enhancing overall user convenience and satisfaction.</p>
          <button className="bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500">
            Learn More
          </button>
        </div>

        
      </div>
    </section>
  );
};

export default About;
