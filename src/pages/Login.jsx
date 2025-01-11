import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      return toast.error("Please fill all the fields");
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("user created successfully");
        setEmail("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(user));
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("user created successfully");
        localStorage.setItem("user", JSON.stringify(user));
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <div className="flex flex-col gap-6 border-[1px] p-8 rounded-lg">
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSignin(e)}
          >
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="border-[2px] h-10 p-2 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="border-[2px] h-10 p-2 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="" className="text-sm hover:text-blue-500">
              <Link to="/signup">Already have an account?</Link>
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md p-2 text-sm hover:bg-blue-700 ease-in-out duration-200"
              onChange={(e) => setEmail(e.target.value)}
            >
              Login
            </button>
          </form>
          <span className="w-full h-[1px] bg-gray-200"></span>
          <button
            className="bg-red-600 text-white rounded-md p-2 text-sm hover:bg-red-700 ease-in-out duration-200"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
