import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file

// AppContext creation for global state management
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  // API URL from .env
  // const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://dynamic-resume-backend.onrender.com";
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8001";
  // 1️⃣ **Login API**
  const loginUser = async (email, password) => {
    try {

      const {data} = await axios.post(`${VITE_BACKEND_URL}/user/login`,{email,password},{headers:{"Content-Type": "application/json"}})

      if (data.success) {
        setUserData(data.data);
        toast.success("Login Successful!");
        console.log("User logged in:",data.success);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(data.message || "Something went wrong");
      console.error("Login failed:", error.message);
    }
  };

  // 2️⃣ **Signup API**
  const signupUser = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/user/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.success) {
        // Set the email in the context after successful signup
        setData({ ...data, email }); 
        toast.success("Signup successful! Please verify your OTP.");
        return response.data;
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Signup failed:", error);
    }
  };
  

  // 3️⃣ **Verify OTP API**
  const verifyOtp = async (otp, email) => {
    console.log("Email in verifyOtp:", email,otp); // Debugging the email
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/user/verify-otp`,
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      
  
      if (response.data.success) {
        toast.success("OTP Verified Successfully!");
        return response.data;
      } else {
        toast.error(response.data.message || "OTP Verification Failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("OTP Verification failed:", error);
    }
  };
  
  // 4️⃣ **Forget Password API**
  const forgetPassword = async (email) => {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/user/forget-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("Password reset email sent!");
        console.log("Reset Link Sent:", response.data);
      } else {
        toast.error(response.data.message || "Reset Failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Forget Password Error:", error);
    }
  };



  const verifyForgetPassword = async(email,otp) => {

    try {
      console.log(email,otp);
      

      const {data} = await axios.post(`${VITE_BACKEND_URL}/user/verify-forgetpassword`,{email,Otp:otp},  { headers: { "Content-Type": "application/json" }})

      if(data.success){
       
          toast.success(data.message);
          console.log(data.message);
          return
        } else {
          toast.error(response.data.message || "Reset Failed");

          return
        }
      

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }



  const resendOtp = async(email)=>{
    console.log(email);
    
 try {
     const {data} = await axios.post(`${VITE_BACKEND_URL}/user/resend-otp`,{email},{ headers: { "Content-Type": "application/json" }})

     if(data.success){
       toast.success(data.message)
     }
     else {
       toast.error(data.message );
     }
 
 
 } catch (error) {
  console.log(error.message);
  
 }


  }


const resetPassword = async(password,confirmPassword)=>{

  try {
    const {data} = await axios.put(`${VITE_BACKEND_URL}/user/update-password`,{email,password,confirmPassword},{headers:{"Content-Type":"application/json"}})
  
  
    if(data.success){
     toast.success(data.success)
    }
    else{
      toast.error(data.success)
    }
  
  } catch (error) {
    console.log(error.message);
    
  }
}


  return (
    <AppContext.Provider value={{ 
      userData, 
      loginUser, 
      signupUser, 
      verifyOtp, 
      data, 
      setData, 
      forgetPassword,
      verifyForgetPassword ,
      resendOtp,
      resetPassword
    }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </AppContext.Provider>
  );
};
