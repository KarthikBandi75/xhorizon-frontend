import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { FaUser, FaEnvelope, FaBook, FaBriefcase, FaInfoCircle, FaIdBadge, FaTrashAlt } from 'react-icons/fa';
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
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      const response = await axios.delete(`/api/faculty/delete/${id}`, { withCredentials: true });
      if (response.data.success) {
        setFaculties(faculties.filter((faculty) => faculty._id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Failed to delete faculty.");
      console.error("Delete error:", err.message);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, [adminToken]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-cyan-900 mb-8"
        >
          Manage Faculties
        </motion.h2>

        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-center mt-10"
          >
            {error}
          </motion.p>
        ) : faculties.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-center mt-10"
          >
            No faculties found.
          </motion.p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((faculty, index) => (
              <motion.div
                key={faculty._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={faculty.image || 'https://via.placeholder.com/96'}
                    alt={faculty.name || 'Faculty Image'}
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/96')}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{faculty.name || 'Unnamed'}</h3>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p><span className="font-medium">Email:</span> {faculty.email || 'No email'}</p>
                  <p><span className="font-medium">Subject:</span> {faculty.subject || 'Unknown Subject'}</p>
                  <p><span className="font-medium">Experience:</span> {faculty.experience ? `${faculty.experience} years` : 'No experience info'}</p>
                  <p><span className="font-medium">Joined:</span> {new Date(faculty.createdAt).toLocaleDateString()}</p>
                  {faculty.description && (
                    <p><span className="font-medium">Description:</span> {faculty.description}</p>
                  )}
                </div>

                <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => deleteFaculty(faculty._id)}
                className="mt-auto w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 px-4 rounded-lg text-sm transition-all cursor-pointer"
              >
                <FaTrashAlt /> Delete Faculty
              </motion.button>

              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFaculties;
