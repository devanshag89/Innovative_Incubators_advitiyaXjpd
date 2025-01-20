import React from "react";
import { Link } from "react-scroll";

function Navbar() {
  return (
    <nav className="bg-black bg-opacity-60 fixed top-0 left-0 w-full z-50 shadow-none">
      <div className="container mx-auto px-10 flex justify-between items-center py-4">
        <Link
          to="hero"
          spy={true}
          smooth={true}
          duration={500}
          className="cursor-pointer text-white font-bold text-3xl"
        >
          Showcase<span className="text-orange-500">X</span>
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-white font-semibold text-lg hover:text-orange-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-white font-semibold text-lg hover:text-orange-500"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-white font-semibold text-lg hover:text-orange-500"
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
              className="cursor-pointer text-white font-semibold text-lg hover:text-orange-500"
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
