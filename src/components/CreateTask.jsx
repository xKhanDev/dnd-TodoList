import React, { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateTask = ({ tasks, setTasks, projectId }) => {
  const [task, setTask] = useState({
    id: Date.now(),
    name: "",
    status: "Todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.name.length < 3 || task.name.length > 50) {
      return toast.error("Task name must be in between 3-50 characters");
    }
    setTasks([...tasks, task]);
    toast.success("Task created successfully");

    try {
      await addDoc(collection(db, "projects", projectId, "tasks"), {
        name: task.name,
        status: task.status,
      });
      setTask({ id: Date.now(), name: "", status: "Todo" });
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full md:w-1/2 lg:w-1/3 mt-8"
    >
      <input
        type="text"
        value={task.name}
        placeholder="Task name"
        className="border border-gray-300 rounded-md p-2 mr-2 w-full text-black"
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTask;
