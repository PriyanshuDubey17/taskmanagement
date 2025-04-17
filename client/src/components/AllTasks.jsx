import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-200 text-yellow-800";
    case "Running":
      return "bg-blue-200 text-blue-800";
    case "Complete":
      return "bg-green-200 text-green-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [deletes, setDeletes] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = () => {
    axios
      .get("http://localhost:4000/api/v1/task/all-task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setTasks(result.data.userData);
        // toast(result.data.message);
        // console.log(result);
      })
      .catch((error) => {
        // toast(error.response.data.message);
        // console.log(error);
      });
  };

  const handleDelete = (id) => {
    setDeletes(true);
    // console.log("kkkkk", id);
    axios
      .delete("http://localhost:4000/api/v1/task/delete-task/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setDeletes(false);
        toast(result.data.message);
        getAllTask();
        // console.log(result);
      })
      .catch((error) => {
        setDeletes(false);
        // console.log(error);
        toast(error.response.data.message);
      });
  };

  return (
    <>
      {tasks.length == 0 ? (
        <div className="h-[30rem] flex flex-col items-center">
          <h2 className="text-2xl font-semibold  mt-15">No course added yet</h2>
          <p className="mt-2">Start by creating your first course.</p>
          <button
            onClick={() => Navigate("/layout/add-task")}
            className="mt-5 bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100 transition duration-200 text-sm md:text-base"
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
            <i className="fa-solid fa-clipboard"></i> All Tasks
          </h1>

          {deletes ? (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={task.taskImgUrl}
                    alt={task.taskTitle}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {task.taskTitle}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {task.taskDescription}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        <i className="fa-solid fa-calendar mr-1"></i>{" "}
                        {task.taskDueDate}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 mt-2 rounded-full text-xs font-semibold ${getStatusColor(
                          task.taskStatus
                        )}`}
                      >
                        {task.taskStatus}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() =>
                          Navigate("/layout/edit-task/" + task._id, {
                            state: task,
                          })
                        }
                        className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllTasks;
