import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import {
  EnvelopeIcon,
  UserIcon,
  BookOpenIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/faculty/faculty-profile", {
        headers: {
          token: localStorage.getItem("FacultyToken"),
        },
      });

      if (response.data.success) {
        setFaculty(response.data.faculty);
        setFormData(response.data.faculty); 
      }
    } catch (error) {
      console.error("Error while fetching profile:", error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (imageFile) {
      form.append('image', imageFile);
    }

    try {
      const response = await axios.put("http://localhost:7000/api/faculty/", form, {
        headers: {
          token: localStorage.getItem("FacultyToken"),
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setFaculty(response.data.faculty);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  if (!faculty) return null;

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Faculty Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 curosr-pointer"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {!isEditing ? (
        <>
          <div className="flex flex-col sm:flex-row gap-8 items-start bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <img
              className="w-40 h-48 object-cover rounded-md border border-gray-300 shadow-sm"
              src={faculty.image}
              alt={faculty.name}
            />
            <div className="flex flex-col gap-3 mt-20 sm:mt-22">
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-indigo-500" />
                {faculty.name}
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-blue-500" />
                {faculty.email}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <BookOpenIcon className="h-4 w-4 text-emerald-500" />
                {faculty.profile}
              </p>
            </div>
          </div>

          <div className="my-10 border-t border-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase mb-1">Subject</p>
              <p className="text-base text-gray-800">{faculty.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase mb-1">Experience</p>
              <p className="text-base text-gray-800">{faculty.experience} years</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 font-semibold uppercase mb-1">Description</p>
              <p className="text-base text-gray-800 leading-relaxed">{faculty.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase mb-1">Faculty ID</p>
              <p className="text-base text-gray-800 flex items-center gap-2">
                <IdentificationIcon className="h-5 w-5 text-indigo-400" />
                {faculty.id}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase mb-1">Subject ID</p>
              <p className="text-base text-gray-800 flex items-center gap-2">
                <ClipboardDocumentListIcon className="h-5 w-5 text-green-400" />
                {faculty.subjectId}
              </p>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditSubmit} className="bg-white p-6 shadow rounded-lg space-y-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Name" className="border px-4 py-2 rounded" />
            <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email" className="border px-4 py-2 rounded" />
            <input type="text" name="subject" value={formData.subject || ''} onChange={handleInputChange} placeholder="Subject" className="border px-4 py-2 rounded" />
            <input type="number" name="experience" value={formData.experience || ''} onChange={handleInputChange} placeholder="Experience" className="border px-4 py-2 rounded" />
            <input type="file" onChange={handleImageChange} className="border px-4 py-2 rounded" />
          </div>
          <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Description" className="w-full border px-4 py-2 rounded" />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default FacultyProfile;
