import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/talentsignup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/talentverify-otp",
        {
          email: formData.email,
          otp,
        }
      );

      setMessage(response.data.message);

      if (response.status === 200) {
        setStep(3);
        navigate("/talent-login");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "An error occurred during OTP verification."
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
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0 opacity-90">
        <div
          className="flex rounded-lg shadow-2xl w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: "500px" }}
        >
          <div className="flex flex-col w-full p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-bold text-orange-600">
                ShowcaseX
              </h1>
              {step === 1 && (
                <>
                  <h1 className="text-xl text-center font-normal mt-4 text-orange-500">
                    Signup as a Talent
                  </h1>
                  <form
                    className="form-horizontal w-3/4 mx-auto"
                    onSubmit={handleSignup}
                  >
                    <div className="flex flex-col mt-4">
                      <input
                        id="name"
                        type="text"
                        className="flex-grow h-8 px-2 border rounded border-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <input
                        id="email"
                        type="email"
                        className="flex-grow h-8 px-2 border rounded border-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <input
                        id="password"
                        type="password"
                        className="flex-grow h-8 px-2 border rounded border-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        name="password"
                        required
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <input
                        id="confirmPassword"
                        type="password"
                        className="flex-grow h-8 px-2 border rounded border-grey-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        name="confirmPassword"
                        required
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded"
                      >
                        Signup
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-4">
                    <a
                      className="no-underline hover:underline text-orange-500 text-xs"
                      href="/talent-login"
                    >
                      Already have an account? Login
                    </a>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h1 className="text-xl text-center font-normal mt-4">
                    Verify OTP
                  </h1>
                  <form
                    className="form-horizontal w-3/4 mx-auto"
                    onSubmit={handleVerifyOtp}
                  >
                    <div className="flex flex-col mt-4">
                      <input
                        id="otp"
                        type="text"
                        className="flex-grow h-8 px-2 border rounded border-grey-400"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col mt-8">
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </form>
                </>
              )}
              {step === 3 && (
                <h1 className="text-xl text-center font-bold mt-4 text-green-600">
                  Signup Complete!
                </h1>
              )}
              <div className="text-center text-orange-500 mt-4">{message}</div>
            </div>
          </div>
          <div>
            <img
              src="/images/Login-img.png"
              alt="A welcoming login illustration"
              className="w-full h-full  rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
