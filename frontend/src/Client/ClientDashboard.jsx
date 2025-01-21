import React, { useState, useEffect } from "react";
import axios from "axios";
import { talentCategories } from "./CategoryData";
import TalentCard from "./TalentCard";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const [talents, setTalents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/get-pending-talents"
        );
        setTalents(response.data.talents);
      } catch (error) {
        console.error("Error fetching talents:", error);
      }
    };
    fetchTalents();
  }, []);

  const filterTalents = () => {
    return talents.filter((talent) =>
      selectedSubcategory
        ? talent.skills.some(
            (skill) =>
              skill.toLowerCase() === selectedSubcategory.toLowerCase()
          )
        : true
    );
  };

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url('../images/Home-img.png')`, // Replace with the actual path to your image
      }}
    >
      {/* Sidebar */}
      <aside className="w-72 h-screen fixed shadow-lg bg-black bg-opacity-80">
        <div className="relative z-10 p-6">
          <h1 className="text-4xl text-orange-500 font-bold mb-8 ml-2 hover:text-orange-800 transition duration-200 cursor-pointer">
            ShowcaseX
          </h1>
          <nav>
            <h2 className="text-2xl font-semibold mb-4 text-orange-300">
              Talent Categories
            </h2>
            <div className="overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
              {talentCategories.map((categoryData) => (
                <div key={categoryData.category} className="mb-4">
                  <button
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === categoryData.category
                          ? null
                          : categoryData.category
                      )
                    }
                    className="text-lg w-full text-left hover:text-orange-300 text-white"
                  >
                    {categoryData.category}
                  </button>
                  {selectedCategory === categoryData.category && (
                    <ul className="pl-4 mt-2">
                      {categoryData.subcategories.map((subcategory) => (
                        <li
                          key={subcategory}
                          className={`mb-1 text-sm cursor-pointer ${
                            selectedSubcategory === subcategory
                              ? "text-orange-300 font-semibold"
                              : "hover:text-orange-300 text-white"
                          }`}
                          onClick={() => setSelectedSubcategory(subcategory)}
                        >
                          {subcategory}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72 relative">
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 p-6">
          <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md sticky top-0 z-10">
            <h3 className="text-3xl font-bold text-orange-600">
              Client Dashboard
            </h3>
            <div className="flex space-x-4">
              <Link to="/client/login">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Login
                </button>
              </Link>
              <Link to="/client/signup">
                <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-100">
                  Signup
                </button>
              </Link>
            </div>
          </header>

          <main className=" bg-opacity-90 p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              {selectedSubcategory
                ? `${selectedSubcategory} Talents`
                : "All Talents"}
            </h2>
            {filterTalents().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
                {filterTalents().map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            ) : (
              <p className="text-black">
                No talents found for the selected subcategory.
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
