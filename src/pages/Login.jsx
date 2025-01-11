import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <div className="flex flex-col gap-6 border-[1px] p-8 rounded-lg">
          <form action="" className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border-[2px] h-10 p-2 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-[2px] h-10 p-2 rounded focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="" className="text-sm hover:text-blue-500">
              <Link to="/signup">Already have an account?</Link>
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md p-2 text-sm hover:bg-blue-700 ease-in-out duration-200"
            >
              Login
            </button>
          </form>
          <span className="w-full h-[1px] bg-gray-200"></span>
          <button className="bg-red-600 text-white rounded-md p-2 text-sm hover:bg-red-700 ease-in-out duration-200">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
