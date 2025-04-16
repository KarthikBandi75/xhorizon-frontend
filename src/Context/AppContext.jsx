import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
 
  const [adminToken, setadminToken] = useState(localStorage.getItem("AdminToken") || "");
  const [facultyToken, setfacultyToken] = useState(localStorage.getItem("FacultyToken") || "");

  
  useEffect(() => {
    if (adminToken) {
      localStorage.setItem("AdminToken", adminToken);
    } else {
      localStorage.removeItem("AdminToken");
    }
  }, [adminToken]);

  useEffect(() => {
    if (facultyToken) {
      localStorage.setItem("FacultyToken", facultyToken);
    } else {
      localStorage.removeItem("FacultyToken");
    }
  }, [facultyToken]);

  return (
    <AuthContext.Provider
      value={{ adminToken, setadminToken, facultyToken, setfacultyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
