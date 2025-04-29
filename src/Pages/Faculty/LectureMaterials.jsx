import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LectureMaterials = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [type, setType] = useState('VideoLink');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const FacultyToken = localStorage.getItem('FacultyToken');

  const addLectureMaterial = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      type,
      topic,
      description,
      fileUrl,
    };

    try {
      const response = await axios.post(`https://xhorizon-backend-1-4pjq.onrender.com/api/lectures/add/${id}`, data, {
        headers: {
          token: FacultyToken,
        },
      });

      if (response.data.success) {
        toast.success("Lecture material added successfully!");
        setTitle('');
        setType('VideoLink');
        setTopic('');
        setDescription('');
        setFileUrl('');
        navigate("/course");
      } else {
        toast.error(response.data.message || "Failed to add material.");
      }
    } catch (error) {
      console.error('Failed to add lecture material:', error);
      toast.error("Error adding material. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add Lecture Material</h2>
      <form onSubmit={addLectureMaterial} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="VideoLink">Video Link</option>
            <option value="GoogleDriveLink">Google Drive Link</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">File URL:</label>
          <input
            type="url"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Add Material'}
        </button>
      </form>
    </div>
  );
};

export default LectureMaterials;
