import React from 'react';

const FacultyDashboard = () => {
  const assessments = [
    { title: 'Mid-Term Test', date: '2025-04-15', totalMarks: 50 },
    { title: 'Quiz 1', date: '2025-03-28', totalMarks: 20 },
  ];

  const codingQuestions = [
    { title: 'Binary Search Tree', level: 'Medium' },
    { title: 'Two Sum Problem', level: 'Easy' },
  ];

  const lectureMaterials = [
    { title: 'Data Structures Notes', uploadedOn: '2025-04-10' },
    { title: 'OOP Concepts PPT', uploadedOn: '2025-04-05' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Faculty Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Assessments */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Assessments</h2>
          {assessments.map((assessment, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{assessment.title}</p>
              <p className="text-sm text-gray-500">Date: {assessment.date}</p>
              <p className="text-sm text-gray-500">Marks: {assessment.totalMarks}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>

        {/* Coding Questions */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Coding Questions</h2>
          {codingQuestions.map((question, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{question.title}</p>
              <p className="text-sm text-gray-500">Level: {question.level}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>

        {/* Lecture Materials */}
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Lecture Materials</h2>
          {lectureMaterials.map((material, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{material.title}</p>
              <p className="text-sm text-gray-500">Uploaded on: {material.uploadedOn}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
