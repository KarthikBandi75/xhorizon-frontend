import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import { FaUsers, FaPlus, FaList, FaBook, FaBuilding, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalFaculties: 0,
    recentFaculties: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const collegeId = "67fa12e9a1e5472ab9e6b801";

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
        toast.error('Failed to load dashboard data.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      {/* Header Banner */}
      <div className="bg-blue-100 border border-blue-200 p-6 rounded-2xl mb-8 shadow-md flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 mb-1">Welcome back, Admin 👋</h1>
          <p className="text-gray-700 text-sm">Here’s a quick overview of what’s happening at your college.</p>
        </div>
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAI0AjQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADoQAAICAQEFBQQIBAcAAAAAAAABAgMEEQUhMUFRBhITYXEiMoGRFCNCUmKxwdFyoeHxQ0RTc5PC8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGnIyacaHfvsjCPnzODa214YmtVOk7/AD4R9f2KzfdbfY7Lpuc3zYE5ldoUtY4tOv4p/sR1u2M6z/G7i6QSRwgDe83Lf+av/wCWRmGfmQ93Ku+M2/zOcASdG3cyv33C1fiWj+aJbD27jXaRu1pn+J6x+ZVgBfU01qt6MlO2ftO/BklF9+rnW3u+HQtWHl1ZlKsplqua5p9GBvAAAAAAAAIrbe0volfg0tePNcfurqd+VfHGx53T92C19SlX3TvunbY9ZTer8gPDbbbbbb3tsAAADMISnJRhGUpPhGK1bAwDthsnNktfCUf4pJGu/Z+XQu9ZRLu9Y71/IDmAAA6MHLswr1bXvXCUeUkc4AvOLfDJojdU9Yy4eRtKt2fzPAyfAm/Yte7ylyLSAAAAAAQHafJ0VWNF8fbl+n6/IgDu23Y7Np3dI6RXwX9zhAAADdiY88m+NVa3vi3yXNlnxMWrEqUKo+snxZH9naUqbLtPalLuryS/uS4AAARW1tmRshK/HjpYt7ivtf1IAunqVTadKozrYRXst95LonvA5gAATaaaejW9PoXbAyPpWJVdzlHf68ykll7MWOWHZW/sT3ejAmQAAAAFIz3rn5P+7P8ANmg6dpR7m0MlP/Uk/m9TmAGDJgCxbAsTwZR13xsf8yS1RWdk5UcbI7tj0rs3N9HyZZVDXRp6gZTT5mO8uoUNOY7iAxGWmveZW9tTUto2aPhovXcT2ZdXi0Ssm/KK6voVWcnZOU5vWUnq2BgGEZAE92Vesstfwf8AYgSwdlY+zkz5NxXy1/cCeAAAAAVTtFV4e0HPlZFS+PBkYWjtFi+NheLFayp9r1XP9/gVcAAbcbHtybVXTHvPn0S6gajvwtp34ijXKPiU8lLdp6MlcPZOPQlKxK2zjrJbl6I7bKq7YdyyEZx6SWoHBDbeLLfJWRfTu6mu/blUY/UVSnLrLckdEtk4Unr4TXpNnurZuHVLvRoi3+L2vzArmXkXZNine239laaJLyNJcbaq7YdyyEZR6NENtDY3cTsw9WuLrfH4AQ4DWj3gAWrs7T4Wzoya32ScvhyKzi0yyMiumHGb09PMu9Vcaq4wgtIxSS9APYAAAADDWq0fBlP2tgvCyWkvqpvWD/T4FxNGbi15lEqrVufBrin1QFLpqnfbCqtazm9Ei1YWLXiU+HDe3vlL7zOXZezZ4Vls7tHL3Ytfd6/+6EiAAAAAAAABD7a2enGWVStJJfWR6+ZBl0IvF2Gvps7Lt+PF6wj9718gNnZ7AdVTyrVpOa9hPlH+pNGEZAAAAAAAAAw0mtGaZVte7vRvAHKDocVLijy6lybA0g2eD5r5GVT5gajKTluSNyriurPSSXADxCvTfLibAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="
          alt="Admin avatar"
          className="h-12 w-12 rounded-full border-2 border-white"
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FaUsers />} label="Total Faculties" value={stats.totalFaculties} />
        <StatCard icon={<FaBuilding />} label="Departments" value={12} />
        <StatCard icon={<FaGraduationCap />} label="Total Students" value={520} />
        <StatCard icon={<FaBook />} label="Courses Offered" value={34} />
      </div>

      {/* Navigation Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <ActionCard icon={<FaPlus />} label="Add New Faculty" link="/add-Faculty" color="blue" />
        <ActionCard icon={<FaList />} label="View All Faculties" link="/faculty-list" color="green" />
        <ActionCard icon={<FaCalendarAlt />} label="Upcoming Events" link="#" color="purple" />
      </div>

      {/* Recent Faculty Additions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Faculty Additions</h2>
        {isLoading ? (
          <SkeletonList />
        ) : error ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg">{error}</p>
          </div>
        ) : stats.recentFaculties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-600">
            <p>No recent faculty additions.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow p-6">
            <ul className="space-y-4">
              {stats.recentFaculties.map((faculty) => (
                <li key={faculty._id} className="flex items-center gap-4 border-b pb-4 last:border-none">
                  <img
                    src={faculty.image || 'https://via.placeholder.com/48'}
                    alt={faculty.name || 'Faculty'}
                    className="h-12 w-12 rounded-full border"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{faculty.name || 'Unnamed Faculty'}</p>
                    <p className="text-xs text-gray-500">
                      {faculty.subject || 'No subject'} | Joined on {new Date(faculty.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to="/faculty-list" className="text-blue-600 text-sm hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white border border-gray-200 shadow rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition">
    <div className="text-2xl text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, label, link, color = 'blue' }) => (
  <Link
    to={link}
    className={`flex items-center gap-4 p-6 bg-white border border-gray-200 shadow rounded-2xl hover:bg-${color}-50 transition`}
  >
    <div className={`text-2xl text-${color}-600`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-lg font-semibold text-${color}-600`}>Go</p>
    </div>
  </Link>
);

const SkeletonList = () => (
  <div className="grid gap-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-2xl shadow animate-pulse flex gap-4 items-center">
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    ))}
  </div>
);

export default AdminDashboard;
