import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const extractedCourses = response.data?.courses?.courses || [];
      setCourses(extractedCourses);
    } catch (error) {
      console.error("Failed to fetch course:", error);
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" />
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">My Courses</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses found.</p>
      ) : (
        courses.map((course) => (
          <div key={course._id} className="mb-12 p-6 bg-white rounded-lg shadow-lg">
            {/* Course Info */}
            <h3 className="text-2xl font-bold text-blue-700 mb-4">{course.title}</h3>
            <div className="text-gray-700 space-y-1 mb-6">
              <p><span className="font-semibold">Code:</span> {course.code}</p>
              <p><span className="font-semibold">Semester:</span> {course.semester}</p>
              <p><span className="font-semibold">Department:</span> {course.department?.toUpperCase()}</p>
              <p><span className="font-semibold">Enrolled Students:</span> {course.enrolledStudents?.length || 0}</p>
              <p><span className="font-semibold">Description:</span> {course.description}</p>
            </div>

            {/* Lecture Materials */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-green-700 mb-3">Lecture Materials</h4>
              {course.lectureMaterials?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-sm text-gray-700">
                      <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Topic</th>
                        <th className="px-4 py-2 border">Type</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.lectureMaterials.map((item) => (
                        <tr key={item._id} className="text-sm text-gray-600">
                          <td className="px-4 py-2 border">{item.title}</td>
                          <td className="px-4 py-2 border">{item.topic}</td>
                          <td className="px-4 py-2 border">{item.type}</td>
                          <td className="px-4 py-2 border">{item.description}</td>
                          <td className="px-4 py-2 border text-center">
                            <button
                              onClick={() => deletelectureMaterial(item._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No lecture materials available.</p>
              )}
              <button
                onClick={() => navigate(`/lectureMaterials/${course._id}`)}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
              >
                Add Lecture Material
              </button>
            </div>

            {/* Coding Questions */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-purple-700 mb-3">Coding Questions</h4>
              {course.CodingQuestions?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-sm text-gray-700">
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
                      {course.CodingQuestions.map((question) => (
                        <tr key={question._id} className="text-sm text-gray-600">
                          <td className="px-4 py-2 border">{question.title}</td>
                          <td className="px-4 py-2 border">{question.difficulty}</td>
                          <td className="px-4 py-2 border">{question.tags.join(", ")}</td>
                          <td className="px-4 py-2 border">{question.language.join(", ")}</td>
                          <td className="px-4 py-2 border">{question.track}</td>
                          <td className="px-4 py-2 border text-center">
                            <button
                              onClick={() => deleteCodingQuestion(question._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No coding questions added.</p>
              )}
              <button
                onClick={() => navigate(`/codingQuestions/${course._id}`)}
                className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition cursor-pointer"
              >
                Add Coding Question
              </button>
            </div>

            {/* Assessments */}
            <div>
              <h4 className="text-xl font-semibold text-red-700 mb-3">Assessments</h4>
              {course.Assesments?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-200 text-sm text-gray-700">
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
                      {course.Assesments.map((assess) => (
                        <tr key={assess._id} className="text-sm text-gray-600">
                          <td className="px-4 py-2 border">{assess.title}</td>
                          <td className="px-4 py-2 border">{assess.type}</td>
                          <td className="px-4 py-2 border">{formatDate(assess.dueDate)}</td>
                          <td className="px-4 py-2 border">{assess.totalMarks}</td>
                          <td className="px-4 py-2 border">{assess.questions?.length || 0}</td>
                          <td className="px-4 py-2 border text-center">
                            <button
                              onClick={() => deleteassessment(assess._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No assessments created yet.</p>
              )}
              <button
                onClick={() => navigate(`/assesments/${course._id}`)}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
              >
                Add Assessment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Course;
