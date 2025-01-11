import React, { useEffect, useState } from "react";
import { VscProject } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CreateProject from "../components/CreateProject";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projects = localStorage.getItem("projects");
    if (projects) {
      setProjects(JSON.parse(projects));
    }
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Project</h1>
        <CreateProject projects={projects} setProjects={setProjects} />
      </div>
      <span className="w-full h-[1px] bg-gray-200"></span>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to="/"
            className="size-[150px] text-gray-300 flex flex-col justify-center items-center gap-2 p-2 border border-gray-300 rounded-lg hover:text-blue-600 hover:scale-105 ease-in-out duration-200 *:text-4xl"
          >
            <VscProject />
            {project.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Project;
