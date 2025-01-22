import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = ({ id }) => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-x-hidden"
      id={id}
    >
      <img
        src="../images/Home-img.png"
        alt="background image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>

      <div className="relative z-10">
        <motion.h1
          className="text-4xl md:text-7xl font-bold text-white -mt-10 mb-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          We are <span className="text-orange-500">Creative</span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-5xl text-white mt-10 mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Ignite Your Talent
        </motion.h2>

        <motion.p
          className="text-orange-500 mt-4 text-2xl mt-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Where Talent Meets Opportunity — Redefining Your Next Hire!
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8 z-10 relative">
        <motion.a
          href="/talent-login"
          className="bg-transparent text-orange-500 border border-orange-500 shadow-md hover:bg-orange-500 hover:text-white transition-all py-3 px-6 rounded-lg flex items-center gap-4 transform hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="font-medium">Got talent to offer?</span>
        </motion.a>

        <motion.div
          className="bg-transparent text-orange-500 border border-orange-500 shadow-md hover:bg-orange-500 hover:text-white transition-all py-3 px-6 rounded-lg flex items-center gap-4 cursor-pointer transform hover:scale-105 group-hover:text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link to="/client" className="w-full h-full flex items-center">
            <span className="font-medium group-hover:text-white">
              Looking to hire talent?
            </span>
          </Link>
        </motion.div>
        <motion.div
          className="bg-transparent text-orange-500 border border-orange-500 shadow-md hover:bg-orange-500 hover:text-white transition-all py-3 px-6 rounded-lg flex items-center gap-4 cursor-pointer transform hover:scale-105 group-hover:text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link to="/admin/login" className="w-full h-full flex items-center">
            <span className="font-medium group-hover:text-white">Admin</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
