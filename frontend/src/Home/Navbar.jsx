import React from "react";
import { Link } from "react-scroll";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-10 flex justify-between items-center py-4">
        <Link to="hero" spy={true} smooth={true} duration={500} className="text-2xl font-bold text-gray-800">
          ShowcaseX
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-gray-900"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-gray-700 hover:text-gray-900"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
