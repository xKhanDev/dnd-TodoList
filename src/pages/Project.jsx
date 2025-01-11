import React, { useEffect, useState } from "react";
import { VscProject } from "react-icons/vsc";
import { Link } from "react-router-dom";
import CreateProject from "../components/CreateProject";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    };
    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      <div className="flex justify-between gap-1">
        <h1 className="text-3xl font-semibold">Project</h1>
        <CreateProject projects={projects} setProjects={setProjects} />
      </div>
      <span className="w-full h-[1px] bg-gray-200"></span>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/home/${project.id}`}
              className="size-[150px] text-gray-300 flex flex-col justify-center items-center gap-2 p-2 border border-gray-300 rounded-lg hover:text-blue-600 hover:scale-105 ease-in-out duration-200 *:text-4xl"
            >
              <VscProject />
              {project.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
