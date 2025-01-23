import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file


// AppContext creation for global state management
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // API URL from .env
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://dynamic-resume-backend.onrender.com";
  // Use VITE_ prefix for Vite environment variables

  // Function to handle login
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${VITE_BACKEND_URL}/login`, { email, password });
      setUserData(response.data); // Set user data in state after successful login
      console.log("User logged in:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Function to handle signup
  const signupUser = async (name, email, password) => {
    try {
      const fullURL = `${VITE_BACKEND_URL}/user/register`;
      console.log("Full URL:", fullURL);
  
      const response = await axios.post(
        fullURL,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    }
  };
  
  return (
    <AppContext.Provider value={{ userData, loginUser, signupUser }}>
      {children}
    </AppContext.Provider>
  );
};
