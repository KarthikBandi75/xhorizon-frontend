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
  const [stats, setStats] = useState({
    totalFaculties: 0,
    recentFaculties: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const collegeId = '67fa12e9a1e5472ab9e6b801';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
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
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
        toast.error('Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Welcome Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
              Welcome back, Admin 👋
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Here’s a quick glance at your college insights.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/48"
            alt="Admin avatar"
            className="h-12 w-12 rounded-full border"
          />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<FaUsers />} label="Total Faculties" value={stats.totalFaculties} />
          <StatCard icon={<FaBuilding />} label="Departments" value={12} />
          <StatCard icon={<FaGraduationCap />} label="Total Students" value={520} />
          <StatCard icon={<FaBook />} label="Courses Offered" value={34} />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard icon={<FaPlus />} label="Add New Faculty" link="/add-Faculty" color="blue" />
          <ActionCard icon={<FaList />} label="View All Faculties" link="/faculty-list" color="green" />
          <ActionCard icon={<FaCalendarAlt />} label="Upcoming Events" link="#" color="purple" />
        </div>

        {/* Recent Faculties */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Faculty Additions</h2>
          {isLoading ? (
            <SkeletonList />
          ) : error ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
              {error}
            </div>
          ) : stats.recentFaculties.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No recent faculty additions.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-6">
              <ul className="divide-y divide-gray-200">
                {stats.recentFaculties.map((faculty) => (
                  <li key={faculty._id} className="flex items-center gap-4 py-4">
                    <img
                      src={faculty.image || 'https://via.placeholder.com/48'}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
                      alt={faculty.name}
                      className="h-12 w-12 rounded-full border"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{faculty.name || 'Unnamed Faculty'}</p>
                      <p className="text-xs text-gray-500">
                        {faculty.subject || 'No Subject'} | Joined on{' '}
                        {new Date(faculty.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link to="/faculty-list" className="text-sm text-blue-600 hover:underline">
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

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-5 rounded-xl border shadow hover:shadow-md transition flex items-center gap-4">
    <div className="text-2xl text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, label, link, color = 'blue' }) => {
  const baseColor = {
    blue: 'text-blue-600 hover:bg-blue-50',
    green: 'text-green-600 hover:bg-green-50',
    purple: 'text-purple-600 hover:bg-purple-50',
  };

  return (
    <Link
      to={link}
      className={`flex items-center gap-4 p-5 bg-white border rounded-xl shadow transition ${baseColor[color]}`}
    >
      <div className={`text-2xl ${baseColor[color]}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-base font-semibold ${baseColor[color]}`}>Go</p>
      </div>
    </Link>
  );
};

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
