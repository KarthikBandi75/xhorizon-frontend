import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import {
  FaUsers,
  FaPlus,
  FaList,
  FaBook,
  FaBuilding,
  FaGraduationCap,
  FaCalendarAlt,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalFaculties: 0, recentFaculties: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const collegeId = '67fa12e9a1e5472ab9e6b801';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get(`/api/faculty/${collegeId}`, {
          withCredentials: true,
        });
        const faculties = data.faculty || [];
        setStats({
          totalFaculties: faculties.length,
          recentFaculties: faculties
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
        });
      } catch (error) {
        setError('Failed to load dashboard data. Please try again.');
        toast.error('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 pt-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Welcome Header */}
        <div className="flex justify-between items-center p-6 bg-white shadow rounded-xl border">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>
            <p className="text-gray-500 mt-1">Here’s your college overview at a glance.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<FaUsers />} label="Total Faculties" value={stats.totalFaculties} bgColor="bg-blue-500" />
          <StatCard icon={<FaBuilding />} label="Departments" value={12} bgColor="bg-green-500" />
          <StatCard icon={<FaGraduationCap />} label="Total Students" value={520} bgColor="bg-purple-500" />
          <StatCard icon={<FaBook />} label="Courses Offered" value={34} bgColor="bg-yellow-500" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard icon={<FaPlus />} label="Add Faculty" link="/add-Faculty" color="blue" />
          <ActionCard icon={<FaList />} label="All Faculties" link="/faculty-list" color="emerald" />
          <ActionCard icon={<FaCalendarAlt />} label="Upcoming Events" link="#" color="indigo" />
        </div>

        {/* Recent Faculty List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Recently Added Faculties</h2>
          {isLoading ? (
            <SkeletonList />
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
          ) : stats.recentFaculties.length === 0 ? (
            <div className="text-gray-500 bg-white p-6 shadow rounded-xl text-center">No recent faculty additions.</div>
          ) : (
            <div className="bg-white shadow rounded-xl p-6">
              <ul className="divide-y divide-gray-200">
                {stats.recentFaculties.map((faculty) => (
                  <li key={faculty._id} className="flex items-center gap-4 py-4">
                    <img
                      src={faculty.image || 'https://via.placeholder.com/48'}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
                      alt={faculty.name}
                      className="w-12 h-12 rounded-full border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{faculty.name || 'Unnamed'}</p>
                      <p className="text-sm text-gray-500">
                        {faculty.subject || 'Unknown Subject'} | Joined on{' '}
                        {new Date(faculty.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link to="/faculty-list" className="text-blue-600 hover:underline text-sm">
                      View
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// StatCard component with background color
const StatCard = ({ icon, label, value, bgColor }) => (
  <div className={`p-5 rounded-xl shadow text-white flex items-center gap-4 ${bgColor}`}>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

// ActionCard with themed color
const ActionCard = ({ icon, label, link, color = 'blue' }) => {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
    emerald: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
    indigo: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100',
  };

  return (
    <Link to={link} className={`p-5 rounded-xl shadow flex items-center gap-4 transition ${colorMap[color]}`}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-base font-semibold">Go</p>
      </div>
    </Link>
  );
};

// Skeleton for loading
const SkeletonList = () => (
  <div className="grid gap-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse flex gap-4 items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    ))}
  </div>
);

export default AdminDashboard;
