import React from "react";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const authUser = localStorage.getItem("user");
  return (
    <div className="w-full h-full text-white bg-[#1f1f1f] p-2 lg:p-10">
      <Router>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Project /> : <Navigate to="/login" />}
          />
          <Route
            path="/home/:id"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
