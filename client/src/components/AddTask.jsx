import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const newTask = new FormData();
    newTask.append("taskTitle", task.title);
    newTask.append("taskDescription", task.description);
    newTask.append("taskDueDate", task.dueDate);
    newTask.append("taskImage", image);

    axios
      .post("http://localhost:4000/api/v1/task/add-task", newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      .then((result) => {
        setIsLoading(false);
        toast(result.data.message);
        // reset form
        setTask({ title: "", description: "", dueDate: "" });
        setImage(null);
        setPreview(null);
        Navigate("/layout/tasks");
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error);
        toast(error.response.data.message);
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto my-6">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Task Title *</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="description"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Task Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && (
            <img
              src={preview}
              alt="Task Preview"
              className="mt-3 w-28 h-28 object-cover rounded-md mx-auto border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          {isLoading && <i className="fas fa-spinner fa-pulse"></i>} Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
