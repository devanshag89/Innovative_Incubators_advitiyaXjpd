import React from "react";

const LoginForm = () => {
  return (
    <div className="bg-white h-screen w-screen">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-2xl w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: "500px" }}
        >
         
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-bold text-purple-700">
                ShowcaseX
              </h1>
              <h2 className="text-xl text-center font-normal mt-4 text-purple-500">
                Login as a Talent
              </h2>
              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  method="POST"
                  action="#"
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 border rounded border-grey-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      name="password"
                      required
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-right mt-2">
                    <a
                      className="no-underline hover:underline text-purple-500 text-xs"
                      href="#"
                    >
                      Forgot Your Password?
                    </a>
                  </div>
                  <div className="flex flex-col mt-4">
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <a
                    className="no-underline hover:underline text-purple-500 text-xs"
                    href="/talent-signup"
                  >
                    Don't have an account?  SignUp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:block md:w-1/2 rounded-r-lg">
            <img
              src="/images/login-img.png"
              alt="A welcoming login illustration"
              className="w-full h-full object-cover rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;