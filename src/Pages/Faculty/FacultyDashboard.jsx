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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-300 text-lg">
        Loading dashboard...
      </div>
    );
  }

  const course = faculty.courses?.[0] || {};
  const { Assesments = [], CodingQuestions = [], lectureMaterials = [] } = course;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Header */}
      <header className="pt-20 pb-8 px-6 sm:px-12 lg:px-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {faculty.name}</h1>
        <p className="mt-2 text-lg opacity-90">Manage your courses and track your teaching progress.</p>
      </header>

      {/* Main Content */}
      <div className="px-6 sm:px-12 lg:px-24 py-12">
        {/* Profile Card */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 flex flex-col sm:flex-row gap-8 items-center transform hover:scale-[1.02] transition-transform duration-300">
          <img
            src={faculty.image || 'https://via.placeholder.com/120'}
            alt={faculty.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{faculty.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{faculty.profile || 'Faculty Member'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 flex items-center justify-center sm:justify-start">
              <span className="mr-1">📧</span> {faculty.email}
            </p>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <SummaryCard title="Experience" value={`${faculty.experience || 0} yrs`} icon={<UserIcon className="h-8 w-8 text-indigo-500" />} />
          <SummaryCard title="Courses Taught" value={faculty.courses?.length || 0} icon={<DocumentTextIcon className="h-8 w-8 text-purple-500" />} />
          <SummaryCard title="Enrolled Students" value={course.enrolledStudents?.length || 0} icon={<ClipboardIcon className="h-8 w-8 text-blue-500" />} />
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <p className="font-semibold text-gray-900 dark:text-white">{a.title}</p>
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
                <p className="font-semibold text-gray-900 dark:text-white">{q.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">📌 {q.level}</p>
              </div>
            )}
          />

          <InfoCard
            title="Lecture Materials"
            icon={<DocumentTextIcon className="h-6 w-6 text-purple-500" />}
            items={lectureMaterials}
            fallback={[
              { title: "OOP Notes", topic: "OOP", fileUrl: "#" },
              { title: "Sorting Algorithms", topic: "DSA", fileUrl: "#" },
            ]}
            renderItem={(m) => (
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 dark:text-white">{m.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">📚 {m.topic}</p>
                <a
                  href={m.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Material
                </a>
              </div>
            )}
          />
        </section>
      </div>
    </main>
  );
};

// Reusable Summary Card
const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
    </div>
  </div>
);

// Reusable Info Card
const InfoCard = ({ title, icon, items, fallback, renderItem }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
    </div>
    <div className="space-y-6">
      {(items.length > 0 ? items : fallback).map((item, i) => (
        <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
          {renderItem(item)}
        </div>
      ))}
    </div>
  </div>
);

export default FacultyDashboard;
