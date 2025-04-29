
import React, { useState } from "react";
import axios from '../../config/axiosConfig.js'
import { toast } from "react-toastify";

const AddFaculty = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [subjectId,setSubjectId]=useState("");
  const collegeId = "67fa12e9a1e5472ab9e6b801";

  const addFaculty = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      subject,
      subjectId,
      description,
      experience,
      college:"67fa12e9a1e5472ab9e6b801"
    };

    try {
      const response = await axios.post("/api/faculty/register", data);
      
      
      
      if (response.data.success) {
        toast.success("Faculty added successfully!");
       
        setName("");
        setEmail("");
        setPassword("");
        setSubject("");
        setDescription("");
        setExperience("");
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-15 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Faculty</h2>
      <form onSubmit={addFaculty} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Experience (in years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
         <input
          type="text"
          placeholder="SubjectId"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Add Faculty
        </button>
      </form>
    </div>
  );
};

export default AddFaculty;
