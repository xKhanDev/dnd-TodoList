import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

const Task = ({ task, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        margin: "5px",
        cursor: "grab",
      }}
      className="bg-gray-200 rounded h-12 flex justify-center items-center text-black"
    >
      {task.name}
    </div>
  );
};

const Column = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => moveTask(item.id, status),
  }));

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        padding: "10px",
        margin: "5px",
        minHeight: "200px",
      }}
      className="border-[1px] rounded p-3 w-full"
    >
      <h3
        className={`font-semibold text-cente h-12 flex justify-center items-center ${
          status === "Todo"
            ? "bg-red-500"
            : status === "In Progress"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}
      >
        {status}
      </h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} moveTask={moveTask} />
      ))}
    </div>
  );
};

const Project = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(
      collection(db, "projects", id, "tasks")
    );
    setTasks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    await addDoc(collection(db, "projects", id, "tasks"), {
      name: newTask,
      status: "Todo",
    });
    setNewTask("");
    fetchTasks();
  };

  const moveTask = async (taskId, newStatus) => {
    const taskRef = doc(db, "projects", id, "tasks", taskId);
    await updateDoc(taskRef, { status: newStatus });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = ["Todo", "In Progress", "Done"];

  return (
    <div className="flex flex-col gap-2 w-full h-screen">
      <h1 className="text-3xl font-semibold">Project Tasks</h1>
      <span className="w-full h-[1px] bg-gray-200"></span>
      <div className="w-full flex justify-center items-center gap-2 my-6">
        <div className="flex items-center justify-between w-1/2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            className="w-[80%] border-[1px] rounded p-2"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {columns.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
