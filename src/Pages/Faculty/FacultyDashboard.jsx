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

  if (!faculty) {
    return (
      <div className="pt-28 text-center text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  const course = faculty.courses?.[0] || {};
  const { Assesments = [], CodingQuestions = [], lectureMaterials = [] } = course;

  return (
    <main className="pt-28 px-4 sm:px-8 lg:px-20 pb-16 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">Welcome, {faculty.name}</h1>
        <p className="text-gray-600">Here’s a quick overview of your teaching activity.</p>
      </header>

      {/* Profile Card */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-12 flex flex-col sm:flex-row gap-6 items-center">
        <img
          src={faculty.image || 'https://via.placeholder.com/100'}
          alt={faculty.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-slate-800">{faculty.name}</h2>
          <p className="text-gray-500 mb-1">{faculty.profile || 'Faculty Member'}</p>
          <p className="text-sm text-gray-400">📧 {faculty.email}</p>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <SummaryCard title="Experience" value={`${faculty.experience || 0} yrs`} />
        <SummaryCard title="Courses Taught" value={faculty.courses?.length || 0} />
        <SummaryCard title="Enrolled Students" value={course.enrolledStudents?.length || 0} />
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InfoCard title="Assessments" icon={<ClipboardIcon className="h-5 w-5 text-blue-500" />} items={Assesments} fallback={[
          { title: "Quiz 1", date: "2025-03-15", totalMarks: 20 },
          { title: "Mid Term", date: "2025-04-01", totalMarks: 40 },
        ]} renderItem={(a) => (
          <>
            <p className="font-medium text-slate-800">{a.title}</p>
            <p className="text-sm text-gray-500">📅 Date: {a.date}</p>
            <p className="text-sm text-gray-500">📝 Marks: {a.totalMarks}</p>
          </>
        )} />

        <InfoCard title="Coding Questions" icon={<CodeBracketIcon className="h-5 w-5 text-green-500" />} items={CodingQuestions} fallback={[
          { title: "Two Sum", level: "Easy" },
          { title: "Merge Intervals", level: "Medium" },
        ]} renderItem={(q) => (
          <>
            <p className="font-medium text-slate-800">{q.title}</p>
            <p className="text-sm text-gray-500">📌 Level: {q.level}</p>
          </>
        )} />

        <InfoCard title="Lecture Materials" icon={<DocumentTextIcon className="h-5 w-5 text-purple-500" />} items={lectureMaterials} fallback={[
          { title: "OOP Notes", topic: "OOP", fileUrl: "#" },
          { title: "Sorting Algorithms", topic: "DSA", fileUrl: "#" },
        ]} renderItem={(m) => (
          <>
            <p className="font-medium text-slate-800">{m.title}</p>
            <p className="text-sm text-gray-500">📚 Topic: {m.topic}</p>
            <a
              href={m.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline"
            >
              View
            </a>
          </>
        )} />
      </section>
    </main>
  );
};

// Reusable Summary Card
const SummaryCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-indigo-600">{value}</p>
  </div>
);

// Reusable Info Card
const InfoCard = ({ title, icon, items, fallback, renderItem }) => (
  <div className="bg-white border rounded-xl shadow-sm p-6">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    </div>
    {(items.length > 0 ? items : fallback).map((item, i) => (
      <div key={i} className="mb-4 last:mb-0">
        {renderItem(item)}
        {i !== items.length - 1 && <hr className="my-3" />}
      </div>
    ))}
  </div>
);

export default FacultyDashboard;
