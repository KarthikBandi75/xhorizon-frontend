import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import {
  ClipboardIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);

  const getDashboardData = async () => {
    try {
      const token = localStorage.getItem('FacultyToken');
      const response = await axios.get("http://localhost:7000/api/course/course", {
        headers: { token },
      });

      if (response.data.success) {
        setFaculty(response.data.courses);
        console.log("Dashboard Data:", response.data.courses);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error.message);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!faculty) return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;

  const course = faculty.courses[0]; // assuming 1 course
  const { Assesments = [], CodingQuestions = [], lectureMaterials = [] } = course;

  // Sample fallback data for visual completeness
  const sampleCodingQuestions = [
    { title: "Two Sum Problem", level: "Easy" },
    { title: "Merge Intervals", level: "Medium" },
    { title: "Graph Traversal", level: "Hard" },
  ];

  const sampleAssessments = [
    { title: "Quiz 1", date: "2025-03-15", totalMarks: 20 },
    { title: "Mid Term", date: "2025-04-01", totalMarks: 40 },
  ];

  const sampleMaterials = [
    { title: "OOP Notes", topic: "Object-Oriented Programming", fileUrl: "#" },
    { title: "Sorting Algorithms", topic: "DSA", fileUrl: "#" },
  ];

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Faculty Info */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">{faculty.name}</h1>
          <p className="text-gray-600">{faculty.profile}</p>
          <p className="text-sm text-gray-500 mt-1">📧 {faculty.email}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <p className="text-sm text-gray-500">Teaching Experience</p>
          <p className="text-2xl font-semibold text-indigo-700">{faculty.experience} yrs</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <p className="text-sm text-gray-500">Courses</p>
          <p className="text-2xl font-semibold text-indigo-700">{faculty.courses.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <p className="text-sm text-gray-500">Enrolled Students</p>
          <p className="text-2xl font-semibold text-indigo-700">{course.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Assessments */}
        <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <ClipboardIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Assessments</h2>
          </div>
          {(Assesments.length > 0 ? Assesments : sampleAssessments).map((a, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-slate-800">{a.title}</p>
              <p className="text-sm text-gray-500">📅 Date: {a.date}</p>
              <p className="text-sm text-gray-500">📝 Marks: {a.totalMarks}</p>
              {i !== Assesments.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </div>

        {/* Coding Questions */}
        <div className="bg-white border border-green-100 rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CodeBracketIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Coding Questions</h2>
          </div>
          {(CodingQuestions.length > 0 ? CodingQuestions : sampleCodingQuestions).map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-slate-800">{q.title}</p>
              <p className="text-sm text-gray-500">📌 Level: {q.level}</p>
              {i !== CodingQuestions.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </div>

        {/* Lecture Materials */}
        <div className="bg-white border border-purple-100 rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex items-center gap-2 text-purple-600 mb-4">
            <DocumentTextIcon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Lecture Materials</h2>
          </div>
          {(lectureMaterials.length > 0 ? lectureMaterials : sampleMaterials).map((m, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-slate-800">{m.title}</p>
              <p className="text-sm text-gray-500">📚 Topic: {m.topic}</p>
              <a
                href={m.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View Resource
              </a>
              {i !== lectureMaterials.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
