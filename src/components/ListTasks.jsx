import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [isDone, setIsDone] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  const statuses = ["Todo", "Inprogress", "Done"];

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    toast.success("Task deleted successfully");
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  useEffect(() => {
    const filterTodos = tasks.filter((task) => task.status === "Todo");
    const filterInprogress = tasks.filter(
      (task) => task.status === "Inprogress"
    );
    const filterIsDone = tasks.filter((task) => task.status === "Done");
    setTodos(filterTodos);
    setInprogress(filterInprogress);
    setIsDone(filterIsDone);
  }, [tasks]);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status) => {
    if (draggedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setDraggedTask(null);
    }
  };

  const createColumn = (title, tasks, status, bgColor) => (
    <div
      onDragOver={(e) => e.preventDefault()} // Allow drop
      onDrop={() => handleDrop(status)}
      className="border-[1px] rounded p-3 w-full"
    >
      <h2
        className={`text-center flex items-center gap-1 ${bgColor} p-2 rounded-lg text-white h-12 uppercase font-semibold`}
      >
        {title}
        <span className="flex justify-center items-center w-5 h-5 rounded-full text-sm p-1 bg-black text-white">
          {tasks.length}
        </span>
      </h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={() => handleDragStart(task)}
          className="flex justify-between items-center my-2 p-2 bg-slate-300 rounded"
        >
          <p>{task.name}</p>
          <p
            className="cursor-pointer hover:scale-110 ease-in duration-300"
            onClick={() => deleteTask(task.id)}
          >
            <MdDelete />
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-4 w-full flex justify-center items-center">
      <div className="flex justify-between w-full h-full mx-4 gap-2">
        {createColumn("😩Todo", todos, "Todo", "bg-slate-600")}
        {createColumn(
          "👨‍💻Inprogress",
          inprogress,
          "Inprogress",
          "bg-purple-400"
        )}
        {createColumn("✅Done", isDone, "Done", "bg-green-500")}
      </div>
    </div>
  );
};

export default ListTasks;
