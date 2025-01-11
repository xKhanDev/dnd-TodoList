import React from "react";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full h-full text-white bg-[#1f1f1f] lg:p-10">
      <Router>
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
