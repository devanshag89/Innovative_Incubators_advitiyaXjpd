import React, { useEffect } from "react";

const Hero = ({ id }) => {
  
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4 relative " id={id}>
      {/* Image with translucent overlay */}
      <img
        src="/images/hero_banner.png"
        alt="background image"
        className="absolute top-0 left-0 w-full h-full object-cover border-2 opacity-50"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div> {/* Overlay for translucent effect */}
      
      {/* Content on top */}
      <h1 className="text-4xl md:text-5xl font-bold text-black z-10 relative -mt-2 mb-4">
        Unleashing Potential<span className="text-green-600">   Celebrating Talent.</span>
      </h1>
      <h2 className="text-2xl md:text-3xl text-black-700 z-10 relative mt-2 mb-3">
        Show Your Talent, Shine Bright.
      </h2>
      <p className="text-black-600 mt-4 text-lg z-10 relative font-bold">
        Unleash your potential and get hired for your talent, shining brighter than ever.
      </p>

      {/* Buttons Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-8 z-10 relative">
        {/* Home Button */}
        <a href="/talentlogin" className="bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-green-500 hover:text-white transition-all py-3 px-6 rounded-lg flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            Got talent to offer?
          </span>
          <span className="text-green-500 text-lg font-bold">&gt;</span>
        </a>

        {/* Business Button */}
        <a className="bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-green-500 hover:text-white transition-all py-3 px-6 rounded-lg flex items-center gap-4">
          <span className="text-gray-700 font-medium m-2">
            Looking to hire talent?
          </span>
          <span className="text-green-500 text-lg font-bold">&gt;</span>
        </a>
      </div>
    </div>
  );
};

export default Hero;
