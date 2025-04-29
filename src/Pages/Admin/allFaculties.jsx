import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import {
  FaUser,
  FaEnvelope,
  FaBook,
  FaBriefcase,
  FaInfoCircle,
  FaIdBadge,
  FaTrashAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AllFaculties = () => {
  const [faculties, setFaculties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminToken = localStorage.getItem("AdminToken");
  const collegeId = "67fa12e9a1e5472ab9e6b801";

  const fetchFaculties = async () => {
    if (!adminToken) return;
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/faculty/${collegeId}`, { withCredentials: true });
      setFaculties(data.faculty || []);
      setError(null);
    } catch (error) {
      setError("Failed to load faculties. Please try again later.");
      toast.error("Failed to load faculties.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`/api/faculty/delete/${id}`, { withCredentials: true });
      setFaculties((prev) => prev.filter((faculty) => faculty._id !== id));
      toast.success("Faculty deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete faculty.");
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, [adminToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-6 sm:px-12">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Faculties
      </motion.h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-600 text-center mt-10">{error}</p>
      ) : faculties.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No faculties found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {faculties.map((faculty) => (
            <motion.div
              key={faculty._id}
              className="bg-white rounded-xl shadow-lg border hover:shadow-2xl p-6 flex flex-col justify-between transition-transform hover:-translate-y-1"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div>
                <div className="flex justify-center mb-4">
                  <img
                    src={faculty.image || 'https://via.placeholder.com/96'}
                    alt={faculty.name || 'Faculty Image'}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/96')}
                    className="h-24 w-24 rounded-full border object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center text-blue-800 flex items-center justify-center gap-2 mb-3">
                  <FaUser /> {faculty.name || 'Unnamed'}
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-500" /> {faculty.email || 'No email'}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBook className="text-gray-500" /> 
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      {faculty.subject || 'Unknown Subject'}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBriefcase className="text-gray-500" />
                    {faculty.experience ? `${faculty.experience} years` : 'No experience info'}
                  </p>
                  <p className="flex items-start gap-2">
                    <FaInfoCircle className="text-gray-500 mt-1" />
                    <span className="text-gray-600">{faculty.description || 'No description'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaIdBadge className="text-gray-500" />
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                      {faculty.subjectId || 'N/A'}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteFaculty(faculty._id)}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-full transition"
              >
                <FaTrashAlt /> Delete Faculty
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllFaculties;
