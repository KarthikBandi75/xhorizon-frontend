import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { AuthContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setadminToken, setfacultyToken } = useContext(AuthContext); // ✅ Get setters from context

  const logout = () => {
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("FacultyToken");
    setadminToken(""); // ✅ Clear token state
    setfacultyToken(""); // ✅ Clear token state
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sm:px-10">
      <div className="flex items-center gap-2 text-lg font-semibold text-blue-700">
        <FaUniversity className="text-2xl text-blue-500" />
        <p className="cursor-pointer">Campus Bridge</p>
      </div>

      <button
        onClick={logout}
        className="px-6 sm:px-10 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow hover:bg-blue-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
