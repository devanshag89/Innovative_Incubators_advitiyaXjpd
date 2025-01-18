import React from "react";

const SignupForm = () => {
  return (
    <div className="bg-blue-400 h-screen w-screen">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: "500px" }}
        >
          {/* Left Content */}
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-bold text-gray-700">ShowcaseX</h1>
              <h1 className="text-xl text-center font-normal mt-4">Signup as a Talent</h1>
              <div className="w-full mt-4">
                <form className="form-horizontal w-3/4 mx-auto" method="POST" action="#">
                  <div className="flex flex-col mt-4">
                    <input
                      id="name"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="email"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      required
                      placeholder="Password"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="check-password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="check-password"
                      required
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Signup
                    </button>
                  </div>
                </form>
                <div className="text-center">
                    <a
                      className="no-underline hover:underline text-blue-dark text-xs"
                      href="/talentlogin"
                    >
                      Or! SignIn?
                    </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
