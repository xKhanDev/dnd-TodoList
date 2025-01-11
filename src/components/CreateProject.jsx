import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateProject = ({ projects, setProjects }) => {
  const [project, setProject] = useState({
    id: Date.now(),
    name: "",
    tasks: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.name.length < 3 || project.name.length > 30)
      return toast.error("Task name must be in between 3-30 characters");
    setProjects([...projects, project]);
    localStorage.setItem("projects", JSON.stringify([...projects, project]));
    toast.success("Project created successfully");
    setProject((project.name = ""));
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={project.name}
        placeholder="Create a project"
        className="border-[2px] border-gray-300 rounded-md p-2 text-black focus:outline-none focus:border-blue-600"
        onChange={(e) => setProject({ ...project, name: e.target.value })}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-md p-2 text-sm hover:bg-blue-700 ease-in-out duration-200"
      >
        Create
      </button>
    </form>
  );
};

export default CreateProject;
