import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleLogin=(e)=>{
        e.preventDefault();
        if(email=="admin.1234@gmail.com" && password=="1234"){
            navigate("/admin/talents");
        }
        else{
            alert("Invalid Email Id and Password");
        }
    };
  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center">
        <img
        src="/images/Home-img.png"
        alt="background image"
        className="absolute top-0 left-0 w-full h-full border-2 opacity-90"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className=" relative z-10  w-1/3 h-1/2 p-5 bg-gray-200 rounded-lg shadow-2xl">
        
        <div className="flex flex-col items-center">
          <img
            src="../images/admin.png"
            alt="Admin"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold text-orange-600">Admin Portal</h2>
        </div>

       
        <form className="mt-6" onSubmit={handleLogin}>
          
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              
            </span>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          
          <div className="relative mt-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              
            </span>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 mt-6 rounded-full hover:bg-orange-600 transition duration-200 opacity-100"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
