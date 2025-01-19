import React from "react";
import { Link } from "react-scroll";

const Hero = ({ id }) => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center px-4 relative mt-16 overflow-x-hidden"
      id={id}
    >
      <img
        src="/images/hero-banner.png"
        alt="background image"
        className="absolute top-0 left-0 w-full h-full object-cover" 
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold text-white -mt-10 mb-3">
          Your Skills,{" "}
          <span className="text-purple-600">Your Stage </span>
        </h1>
        <h2 className="text-2xl md:text-5xl text-white mt-10">
          Let the World See You
        </h2>
        <p className="text-white mt-4 text-2xl mt-10">
          Unlock your future and let your talent shine - your potential has no limits.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 z-10 relative">
        <a
          href="/talent-login"
          className="bg-purple-500 text-white border border-gray-300 shadow-md hover:bg-white hover:text-purple-900 transition-all py-3 px-6 rounded-lg flex items-center gap-4"
        >
          <span className="font-medium">Got talent to offer?</span>
          <span className="text-purple-900 text-lg font-bold">&gt;</span>
        </a>
        <Link
          to="/talent-signup"
          className="bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-purple-500 hover:text-white transition-all py-3 px-6 rounded-lg flex items-center gap-4"
        >
          <span className="text-purple-900 font-medium">Looking to hire talent?</span>
          <span className="text-purple-900 text-lg font-bold">&gt;</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
