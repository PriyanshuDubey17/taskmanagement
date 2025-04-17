import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    image: "",
    status: "",
  });

  // console.log("l", location.state);
  // console.log("l", id);
  useEffect(() => {
    setFormData({
      title: location.state.taskTitle,
      description: location.state.taskDescription,
      dueDate: location.state.taskDueDate,
      image: location.state.taskImgUrl,
      status: location.state.taskStatus,
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // console.log("Edited Task Data:", formData);

    const updateData = new FormData();
    updateData.append("taskTitle", formData.title);
    updateData.append("taskDescription", formData.description);
    updateData.append("taskDueDate", formData.dueDate);
    updateData.append("taskStatus", formData.status);
    if (formData.image) {
      updateData.append("taskImage", formData.image);
    }

    axios
      .put("http://localhost:4000/api/v1/task/update-task/" + id, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setIsLoading(false);
        // console.log(result);
        toast(result.data.message);
        navigate("/layout/tasks");
      })
      .catch((error) => {
        setIsLoading(false);
        toast(error.response.data.message);
        // console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Edit Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Image Upload Option */}
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setFormData((prev) => ({
                  ...prev,
                  image: imageUrl,
                }));
              }
            }}
            className="w-full border p-2 rounded"
          />

          
          {formData.image && (
            <div className="text-center mt-4">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded border"
              />
            </div>
          )}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Running">Running</option>
            <option value="Complete">Complete</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLoading && <i className="fas fa-spinner fa-pulse"></i>} Save
            Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
