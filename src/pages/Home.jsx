import React, { useEffect, useState } from "react";
import CreateTask from "../components/CreateTask";
import ListTasks from "../components/ListTasks";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () => {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        setTasks(JSON.parse(tasks));
      } else {
        <p>No tasks found</p>;
      }
    };
    fetchTasks();
  }, []);
  return (
    <div className="w-full h-screen bg-[#1f1f1f] flex flex-col items-center">
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
