import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    DOB: "",
    breed: "",
    gender: "",
    category: "",
    image: null,
  });

  const genders = ["Male", "Female", "Neuter", "Other"];
  const categories = ["dog", "cat", "rabit", "bird"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("peddy-user"));
    if (!user || !user.user_id) {
      toast.error("You must be logged in to post.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("details", formData.details);
    data.append("DOB", formData.DOB);
    data.append("breed", formData.breed);
    data.append("gender", formData.gender);
    data.append("category", formData.category);
    data.append("image", formData.image);
    data.append("posted_by", user.user_id);

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "http://localhost:5000/api/pet/create-post",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Post created successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(data.message || "Failed to post!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Create New Pet Post</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="details"
          placeholder="Details"
          value={formData.details}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded transition-all duration-200 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
