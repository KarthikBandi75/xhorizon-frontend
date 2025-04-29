import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const addCourse = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!title || !code || !description || !semester || !department) {
      setError("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post("/api/course", {
        title,
        code,
        description,
        semester,
        department,
      });

      if (data.success) {
        toast.success("Course added successfully!");

        
        setTitle("");
        setCode("");
        setDescription("");
        setSemester("");
        setDepartment("");

        setMessage(data.message);
      } else {
        toast.warn(data.message || "Adding course failed.");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-15">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={addCourse} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
