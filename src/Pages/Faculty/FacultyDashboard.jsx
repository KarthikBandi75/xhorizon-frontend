import React, { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { ClipboardIcon, DocumentTextIcon, UserIcon } from '@heroicons/react/24/outline';

const FacultyDashboard = () => {
 const facultyToken=localStorage.getItem('FacultyToken');
  const [metrics, setMetrics] = useState({
    totalCourses: 1,
    activeCourses: 1,
    totalStudents: 100,
    profileCompletion: 75,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [facultyName, setFacultyName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('FacultyToken');
        
        const coursesRes = await axios.get("https://xhorizon-backend-1-4pjq.onrender.com/api/course/course", {
          headers: { token },
        });

   
        // Validate that courses is an array
        const courses = Array.isArray(coursesRes.data.courses) ? coursesRes.data.courses : [];
        const totalCourses = courses.length;
        const activeCourses = courses.filter(course => course.isActive).length;
        const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledStudents?.length || 0), 0);

        const profileRes = await axios.get("https://xhorizon-backend-1-4pjq.onrender.com/api/faculty/profile", {
          headers: { token },
        });

        // Log the profile response for debugging
        console.log('Profile API Response:', profileRes.data);

        const profile = profileRes.data.profile || {};
        setFacultyName(profile.name || 'Faculty Member');

        const profileFields = [
          profile.email,
          profile.profile,
          profile.image,
          profile.experience,
        ];
        const completedFields = profileFields.filter(field => field && field !== '').length;
        const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

        setMetrics({ totalCourses, activeCourses, totalStudents, profileCompletion });

        // Safely access the first course's assessments and materials
        const recentAssessments = (Array.isArray(courses[0]?.Assesments) ? courses[0].Assesments.slice(0, 2) : []).map(assessment => ({
          type: 'assessment',
          text: `Added assessment: ${assessment.title}`,
          link: `/course/${courses[0]?._id || ''}`,
          date: assessment.createdAt || new Date().toISOString(),
        }));
        const recentMaterials = (Array.isArray(courses[0]?.lectureMaterials) ? courses[0].lectureMaterials.slice(0, 2) : []).map(material => ({
          type: 'material',
          text: `Uploaded material: ${material.title}`,
          link: material.fileUrl || '#',
          date: material.createdAt || new Date().toISOString(),
        }));
        setRecentActivity([...recentAssessments, ...recentMaterials].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4));

        if (coursesRes.data.success && profileRes.data.success) {
          toast.success('Dashboard data loaded successfully');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (facultyToken) fetchData();
  }, [facultyToken]);

  const tableData = [
    { name: 'Total Courses', value: metrics.totalCourses, color: '#0A66C2' },
    { name: 'Active Courses', value: metrics.activeCourses, color: '#00A69C' },
    { name: 'Enrolled Students', value: metrics.totalStudents, color: '#EF4444' },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 bg-[#F4F6F8]"
    >
      <div className="max-w-6xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-[#1F2A44] mb-2">Welcome, {facultyName}</h1>
            <p className="text-sm text-[#6B7280]">"Empower students with knowledge and skills."</p>
          </div>
          <Link
            to="/course"
            className="mt-4 md:mt-0 px-4 py-2 bg-[#0A66C2] text-white rounded-md text-sm font-medium hover:bg-[#0958A6]"
          >
            Manage Courses
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: 'Total Courses', value: metrics.totalCourses, icon: <DocumentTextIcon className="text-[#0A66C2] h-6 w-6" />, link: '/course' },
            { label: 'Active Courses', value: metrics.activeCourses, icon: <DocumentTextIcon className="text-[#00A69C] h-6 w-6" />, link: '/course' },
            { label: 'Enrolled Students', value: metrics.totalStudents, icon: <UserIcon className="text-[#EF4444] h-6 w-6" />, link: '/course' },
            { label: 'Profile Completion', value: metrics.profileCompletion, icon: <UserIcon className="text-[#0A66C2] h-6 w-6" />, link: '/profile' },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={cardVariants}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow flex items-center space-x-3"
            >
              {metric.icon}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#6B7280]">{metric.label}</h3>
                <p className="text-xl font-semibold text-[#1F2A44]">
                  {metric.label === 'Profile Completion' ? `${metric.value}%` : metric.value}
                </p>
                <Link to={metric.link} className="text-[#0A66C2] hover:text-[#0958A6] text-sm">
                  View Details
                </Link>
              </div>
              {metric.label === 'Profile Completion' && (
                <div className="w-12 h-12 flex items-center justify-center bg-[#E6F0FA] rounded-full">
                  <span className="text-sm font-semibold text-[#0A66C2]">{metric.value}%</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5 border border-gray-200"
          >
            <h3 className="text-base font-semibold text-[#1F2A44] mb-4">Course Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm font-medium text-[#6B7280] border-b border-gray-200">
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <motion.tr
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-[#E6F0FA]"
                    >
                      <td className="py-3 px-4 text-sm text-[#1F2A44] font-medium">{item.name}</td>
                      <td className="py-3 px-4 text-sm font-semibold" style={{ color: item.color }}>
                        {item.value}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-sm p-5 border border-gray-200"
          >
            <h3 className="text-base font-semibold text-[#1F2A44] mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`p-2 rounded-full ${activity.type === 'assessment' ? 'bg-[#E6F0FA]' : 'bg-[#D1FAE5]'}`}>
                      {activity.type === 'assessment' ? <ClipboardIcon className="text-[#0A66C2] h-4 w-4" /> : <DocumentTextIcon className="text-[#00A69C] h-4 w-4" />}
                    </div>
                    <div>
                      <Link to={activity.link} className="text-[#1F2A44] hover:text-[#0A66C2] text-sm">
                        {activity.text}
                      </Link>
                      <p className="text-xs text-[#6B7280]">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#6B7280] text-sm">No recent activity</p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-sm p-5 border border-gray-200"
        >
          <h3 className="text-base font-semibold text-[#1F2A44] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              { label: 'Add New Course', link: '/course', color: 'bg-[#0A66C2] hover:bg-[#0958A6]' },
              { label: 'View All Courses', link: '/course', color: 'bg-[#00A69C] hover:bg-[#008C84]' },
              { label: 'Manage Assessments', link: '/course', color: 'bg-[#0A66C2] hover:bg-[#0958A6]' },
              { label: 'Edit Profile', link: '/profile', color: 'bg-[#00A69C] hover:bg-[#008C84]' },
            ].map((action, index) => (
              <motion.div
                key={action.label}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={action.link}
                  className={`block text-center px-3 py-2 text-white text-sm font-medium rounded-md ${action.color}`}
                >
                  {action.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FacultyDashboard;
