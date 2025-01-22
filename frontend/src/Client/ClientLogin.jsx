import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useClient } from "../contexts/ClientContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useClient();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/client-login",
        formData
      );

      if (response.status === 200) {
        const { token, email } = response.data;
        console.log(response.data);
        login(token, email);

        navigate("/client");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/Services-img.png')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 w-full sm:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-orange-600 text-center">
              ShowcaseX
            </h1>
            <h2 className="text-xl text-orange-500 text-center mt-4">
              Login as a Client
            </h2>
            <form className="w-3/4 mx-auto mt-6" onSubmit={handleSubmit}>
              <div className="flex flex-col mt-4">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="flex-grow h-10 px-4 border rounded border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="flex-grow h-10 px-4 border rounded border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="text-right mt-2">
                <a href="#" className="text-xs text-orange-500 hover:underline">
                  Forgot Your Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded mt-4 hover:bg-orange-700"
              >
                Login
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              <a
                href="/client/signup"
                className="text-orange-500 hover:underline"
              >
                Don't have an account? Sign up
              </a>
            </p>
          </div>

          <div className="hidden md:block md:w-1/2 rounded-r-lg">
            <img
              src="/images/client.png"
              alt="Login illustration"
              className="w-full h-full  rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
