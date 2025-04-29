import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const FacultyToken = localStorage.getItem("FacultyToken");
  const navigate = useNavigate();

  const getCourse = async () => {
    if (!FacultyToken) return;
    try {
      const token = localStorage.getItem('FacultyToken');
      const response = await axios.get("https://xhorizon-backend-1-4pjq.onrender.com/api/course/course", {
        headers: { token },
      });
      const extractedCourses = Array.isArray(response.data?.courses?.courses) ? response.data.courses.courses : [];
      setCourses(extractedCourses);
    } catch (error) {
      console.error("Failed to fetch course:", error);
      toast.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [FacultyToken]);

  const deleteCodingQuestion = async (id) => {
    try {
      const token = localStorage.getItem("FacultyToken");
      await axios.delete(`https://xhorizon-backend-1-4pjq.onrender.com/api/coading-questions/${id}`, {
        headers: { token },
      });
      toast.success("Coding question deleted!");
      getCourse();
    } catch (error) {
      toast.error("Failed to delete coding question.");
    }
  };

  const deletelectureMaterial = async (id) => {
    try {
      const token = localStorage.getItem("FacultyToken");
      await axios.delete(`https://xhorizon-backend-1-4pjq.onrender.com/api/lectures/${id}`, {
        headers: { token },
      });
      toast.success("Lecture material deleted!");
      getCourse();
    } catch (error) {
      toast.error("Failed to delete lecture material.");
    }
  };

  const deleteassessment = async (id) => {
    try {
      const token = localStorage.getItem("FacultyToken");
      await axios.delete(`https://xhorizon-backend-1-4pjq.onrender.com/api/assesment/${id}`, {
        headers: { token },
      });
      toast.success("Assessment deleted!");
      getCourse();
    } catch (error) {
      toast.error("Failed to delete assessment.");
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 bg-[#F4F6F8]"
    >
      <ToastContainer position="top-center" />
      <div className="max-w-6xl mx-auto py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-[#1F2A44] text-center mb-10"
        >
          My Courses
        </motion.h2>

        {loading ? (
          <p className="text-center text-[#6B7280] text-lg">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-[#6B7280] text-lg">No courses found.</p>
        ) : (
          courses.map((course, index) => (
            <motion.div
              key={course._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Course Info */}
              <h3 className="text-2xl font-bold text-[#0A66C2] mb-4">{course.title}</h3>
              <div className="text-[#1F2A44] space-y-2 mb-6">
                <p><span className="font-semibold">Code:</span> {course.code}</p>
                <p><span className="font-semibold">Semester:</span> {course.semester}</p>
                <p><span className="font-semibold">Department:</span> {course.department?.toUpperCase()}</p>
                <p><span className="font-semibold">Enrolled Students:</span> {course.enrolledStudents?.length || 0}</p>
                <p><span className="font-semibold">Description:</span> {course.description}</p>
              </div>

              {/* Lecture Materials */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-[#00A69C] mb-3">Lecture Materials</h4>
                {course.lectureMaterials?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border border-gray-200">
                      <thead className="bg-[#D1FAE5] text-sm text-[#1F2A44]">
                        <tr>
                          <th className="px-4 py-2 border">Title</th>
                          <th className="px-4 py-2 border">Topic</th>
                          <th className="px-4 py-2 border">Type</th>
                          <th className="px-4 py-2 border">Description</th>
                          <th className="px-4 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.lectureMaterials.map((item, idx) => (
                          <motion.tr
                            key={item._id}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: idx * 0.05 }}
                            className="text-sm text-[#1F2A44] hover:bg-[#E6F0FA]"
                          >
                            <td className="px-4 py-2 border">{item.title}</td>
                            <td className="px-4 py-2 border">{item.topic}</td>
                            <td className="px-4 py-2 border">{item.type}</td>
                            <td className="px-4 py-2 border">{item.description}</td>
                            <td className="px-4 py-2 border text-center">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => deletelectureMaterial(item._id)}
                                className="bg-[#EF4444] text-white px-3 py-1 rounded hover:bg-red-600 flex items-center justify-center mx-auto"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" /> Delete
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-[#6B7280]">No lecture materials available.</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/lectureMaterials/${course._id}`)}
                  className="mt-3 px-4 py-2 bg-[#00A69C] text-white rounded-md text-sm font-medium hover:bg-[#008C84] flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-1" /> Add Lecture Material
                </motion.button>
              </div>

              {/* Coding Questions */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-[#0A66C2] mb-3">Coding Questions</h4>
                {course.CodingQuestions?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border border-gray-200">
                      <thead className="bg-[#E6F0FA] text-sm text-[#1F2A44]">
                        <tr>
                          <th className="px-4 py-2 border">Title</th>
                          <th className="px-4 py-2 border">Difficulty</th>
                          <th className="px-4 py-2 border">Tags</th>
                          <th className="px-4 py-2 border">Language</th>
                          <th className="px-4 py-2 border">Track</th>
                          <th className="px-4 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.CodingQuestions.map((question, idx) => (
                          <motion.tr
                            key={question._id}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: idx * 0.05 }}
                            className="text-sm text-[#1F2A44] hover:bg-[#E6F0FA]"
                          >
                            <td className="px-4 py-2 border">{question.title}</td>
                            <td className="px-4 py-2 border">{question.difficulty}</td>
                            <td className="px-4 py-2 border">{question.tags.join(", ")}</td>
                            <td className="px-4 py-2 border">{question.language.join(", ")}</td>
                            <td className="px-4 py-2 border">{question.track}</td>
                            <td className="px-4 py-2 border text-center">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => deleteCodingQuestion(question._id)}
                                className="bg-[#EF4444] text-white px-3 py-1 rounded hover:bg-red-600 flex items-center justify-center mx-auto"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" /> Delete
                              </motion.button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-[#6B7280]">No coding questions added.</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/codingQuestions/${course._id}`)}
                  className="mt-3 px-4 py-2 bg-[#0A66C2] text-white rounded-md text-sm font-medium hover:bg-[#0958A6] flex items-center"
                >
                  <PlusIcon className="h-plot5 w-5 mr-1" /> Add Coding Question
                </motion.button>
              </div>

              {/* Assessments */}
              <div>
                <h4 className="text-xl font-semibold text-[#EF4444] mb-3">Assessments</h4>
                {course.Assesments?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border border-gray-200">
                      <thead className="bg-red-100 text-sm text-[#1F2A44]">
                        <tr>
                          <th className="px-4 py-2 border">Title</th>
                          <th className="px-4 py-2 border">Type</th>
                          <th className="px-4 py-2 border">Due Date</th>
                          <th className="px-4 py-2 border">Total Marks</th>
                          <th className="px-4 py-2 border">No. of Questions</th>
                          <th className="px-4 py-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.Assesments.map((assess, idx) => (
                          <motion.tr
                            key={assess._id}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: idx * 0.05 }}
                            className="text-sm text-[#1F2A44] hover:bg-[#E6F0FA]"
                          >
                            <td className="px-4 py-2 border">{assess.title}</td>
                            <td className="px-4 py-2 border">{assess.type}</td>
                            <td className="px-4 py-2 border">{formatDate(assess.dueDate)}</td>
                            <td className="px-4 py-2 border">{assess.totalMarks}</td>
                            <td className="px-4 py-2 border">{assess.questions?.length || 0}</td>
                            <td className="px-4 py-2 border text-center">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => deleteassessment(assess._id)}
                                className="bg-[#EF4444] text-white px-3 py-1 rounded hover:bg-red-600 flex items-center justify-center mx-auto"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" /> Delete
                              </motion.button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-[#6B7280]">No assessments created yet.</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/assesments/${course._id}`)}
                  className="mt-3 px-4 py-2 bg-[#EF4444] text-white rounded-md text-sm font-medium hover:bg-red-600 flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-1" /> Add Assessment
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Course;
