import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("user created successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-center">Signup</h1>
        <div className="flex flex-col gap-6 border-[1px] p-8 rounded-lg">
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="text-black border-[2px] h-10 p-2 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="text-black border-[2px] h-10 p-2 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="" className="text-sm hover:text-blue-500">
              <Link to="/login">Already have an account?</Link>
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md p-2 text-sm hover:bg-blue-700 ease-in-out duration-200"
            >
              Signup
            </button>
          </form>
          <span className="w-full h-[1px] bg-gray-200"></span>
          <button className="bg-red-600 text-white rounded-md p-2 text-sm hover:bg-red-700 ease-in-out duration-200">
            Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
