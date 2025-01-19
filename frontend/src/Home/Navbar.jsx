import React from "react";
import { Link } from "react-scroll";

function Navbar() {
  return (
    <nav className="bg-purple-300 fixed w-full top-0 left-0 z-50 ">
      <div className="container mx-auto px-10 flex justify-between items-center py-4">
        <Link to="hero" spy={true} smooth={true} duration={500} className="cursor-pointer text-purple-700 hover:text-purple-900 cursor-pointer  font-semibold text-2xl">
          ShowcaseX
        </Link>

        <ul className="hidden lg:flex space-x-8 mr-10">
          <li>
            <Link
              to="hero"
              spy={true}
              smooth={true}
              duration={500}
              className="cursor-pointer text-purple-700 hover:text-purple-900 cursor-pointer  font-semibold text-lg"
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
              className="cursor-pointer text-purple-700 hover:text-purple-900 cursor-pointer  font-semibold text-lg"
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
              className="cursor-pointer text-purple-700 hover:text-purple-900 cursor-pointer  font-semibold text-lg"
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
              className="cursor-pointer text-purple-700 hover:text-purple-900 cursor-pointer  font-semibold text-lg"
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
