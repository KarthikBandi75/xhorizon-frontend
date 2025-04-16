import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import FacultySideBar from './Components/facultySidebar';

import AdminDashboard from './Pages/Admin/admindashboard.jsx';
import AddFaculty from './Pages/Admin/addFaculty.jsx';
import AllFaculties from './Pages/Admin/allFaculties.jsx';

import FacultyDashboard from './Pages/Faculty/FacultyDashboard.jsx';
import Assessments from './Pages/Faculty/Assessments.jsx';
import CodingQuestions from './Pages/Faculty/CodingQuestions.jsx';
import LectureMaterials from './Pages/Faculty/LectureMaterials.jsx';

import Login from './Pages/Login.jsx';
import { AuthContext } from './Context/AppContext.jsx';
import AddCourse from './Pages/Admin/AddCourse.jsx';
import Course from './Pages/Faculty/Course.jsx';
import Profile from './Pages/Faculty/Profile.jsx';
import AddInternships from './Pages/Admin/AddInternships.jsx';

const App = () => {
  const { adminToken, facultyToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ((adminToken || facultyToken) && location.pathname === "/") {
      if (adminToken) navigate("/admin-dashboard");
      else if (facultyToken) navigate("/faculty-dashboard");
    }
  }, [adminToken, facultyToken, location.pathname, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {(adminToken || facultyToken) && <Navbar />}
      
      <div className="flex">
       
        {adminToken && <Sidebar />}
        {facultyToken && <FacultySideBar />}

       
        <div className="flex-1 p-4">
          <Routes>
           
            <Route path="/login" element={<Login />} />

           
            {adminToken && (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/add-faculty" element={<AddFaculty />} />
                <Route path="/faculty-list" element={<AllFaculties />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path="/add-jobs" element={<AddInternships/>}/>
              </>
            )}

           
            {facultyToken && (
              <>
                <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                <Route path="/assesments/:id" element={<Assessments />} />
                <Route path="/codingQuestions/:id" element={<CodingQuestions />} />
                <Route path="/lectureMaterials/:id" element={<LectureMaterials />} />
                <Route path="/course" element={<Course/>}/>
                <Route path="/profile" element={<Profile/>}/>
              </>
            )}

            
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
