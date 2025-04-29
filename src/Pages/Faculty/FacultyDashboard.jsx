import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import {
  ClipboardIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('FacultyToken');
        const response = await axios.get("https://xhorizon-backend-1-4pjq.onrender.com/api/course/course", {
          headers: { token },
        });
        if (response.data.success) {
          setFaculty(response.data.courses);
        }
      } catch (error) {
        console.error("Error loading dashboard:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-300 text-lg pt-16">
        Loading dashboard...
      </div>
    );
  }

  const course = faculty.courses?.[0] || {};
  const { Assesments = [], CodingQuestions = [], lectureMaterials = [] } = course;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pt-20">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-8 px-6 sm:px-12 lg:px-24 bg-gradient-to-r from-[#0A66C2] to-[#0958A6] text-white"
      >
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {faculty.name}</h1>
        <p className="mt-2 text-lg opacity-90">Manage your courses and track your teaching progress.</p>
      </motion.header>

      {/* Main Content */}
      <div className="px-6 sm:px-12 lg:px-24 py-12 max-w-6xl mx-auto">
        {/* Profile Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 flex flex-col sm:flex-row gap-8 items-center transform hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src={faculty.image || 'https://via.placeholder.com/120'}
            alt={faculty.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-[#0A66C2] dark:border-[#0958A6]"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-[#1F2A44] dark:text-white">{faculty.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{faculty.profile || 'Faculty Member'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 flex items-center justify-center sm:justify-start">
              <span className="mr-1">📧</span> {faculty.email}
            </p>
          </div>
        </motion.section>

        {/* Summary Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          <SummaryCard title="Experience" value={`${faculty.experience || 0} yrs`} icon={<UserIcon className="h-8 w-8 text-[#0A66C2]" />} />
          <SummaryCard title="Courses Taught" value={faculty.courses?.length || 0} icon={<DocumentTextIcon className="h-8 w-8 text-[#0958A6]" />} />
          <SummaryCard title="Enrolled Students" value={course.enrolledStudents?.length || 0} icon={<ClipboardIcon className="h-8 w-8 text-blue-500" />} />
        </motion.section>

        {/* Main Content Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <InfoCard
            title="Assessments"
            icon={<ClipboardIcon className="h-6 w-6 text-blue-500" />}
            items={Assesments}
            fallback={[
              { title: "Quiz 1", date: "2025-03-15", totalMarks: 20 },
              { title: "Mid Term", date: "2025-04-01", totalMarks: 40 },
            ]}
            renderItem={(a) => (
              <div className="space-y-2">
                <p className="font-semibold text-[#1F2A44] dark:text-white">{a.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">📅 {a.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">📝 {a.totalMarks} Marks</p>
              </div>
            )}
          />

          <InfoCard
            title="Coding Questions"
            icon={<CodeBracketIcon className="h-6 w-6 text-green-500" />}
            items={CodingQuestions}
            fallback={[
              { title: "Two Sum", level: "Easy" },
              { title: "Merge Intervals", level: "Medium" },
            ]}
            renderItem={(q) => (
              <div className="space-y-2">
                <p className="font-semibold text-[#1F2A44] dark:text-white">{q.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">📌 {q.level}</p>
              </div>
            )}
          />

          <InfoCard
            title="Lecture Materials"
            icon={<DocumentTextIcon className="h-6 w-6 text-[#0958A6]" />}
            items={lectureMaterials}
            fallback={[
              { title: "OOP Notes", topic: "OOP", fileUrl: "#" },
              { title: "Sorting Algorithms", topic: "DSA", fileUrl: "#" },
            ]}
            renderItem={(m) => (
              <div className="space-y-2">
                <p className="font-semibold text-[#1F2A44] dark:text-white">{m.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">📚 {m.topic}</p>
                <a
                  href={m.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0A66C2] dark:text-[#0958A6] hover:underline"
                >
                  View Material
                </a>
              </div>
            )}
          />
        </motion.section>
      </div>
    </main>
  );
};

// Reusable Summary Card
const SummaryCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-4 transform transition-transform duration-300"
  >
    <div className="p-3 bg-[#E6F0FA] dark:bg-[#1F2A44] rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-[#0A66C2] dark:text-[#0958A6]">{value}</p>
    </div>
  </motion.div>
);

// Reusable Info Card
const InfoCard = ({ title, icon, items, fallback, renderItem }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-transform duration-300"
  >
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-xl font-semibold text-[#1F2A44] dark:text-white">{title}</h2>
    </div>
    <div className="space-y-6">
      {(items.length > 0 ? items : fallback).map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="p-4 bg-[#E6F0FA] dark:bg-[#1F2A44] rounded-lg hover:bg-[#D6E4F5] dark:hover:bg-[#2A3A55] transition"
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default FacultyDashboard;
