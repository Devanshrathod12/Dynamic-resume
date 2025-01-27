import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Use navigate hook

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://dynamic-resume-backend.onrender.com";

  // Function to handle login
  const loginUser = async (email, password) => {
    try {
      console.log("URL:", `${VITE_BACKEND_URL}/login`);
      console.log("Payload:", { email, password });
  
      const response = await axios.post(`${VITE_BACKEND_URL}/user/login`, { email, password });
      setUserData(response.data); // Set user data
      console.log("User logged in:", response.data);
     toast.success("user login")
      navigate("/home"); // Redirect to home page
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed! Please check your credentials.");
    }
  };
  

  // Function to handle signup
  const signupUser = async (name, email, password) => {
    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/user/register`, { name, email, password });
      console.log("Signup successful:", response.data);
      navigate("/home"); // Redirect to home page
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed! Please try again.");
    }
  };

  return (
    <AppContext.Provider value={{ userData, loginUser, signupUser }}>
      {children}
    </AppContext.Provider>
  );
};
