import React, { useState } from 'react';
import { useAppContext } from '../src/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const { verifyOtp, data } = useAppContext(); // Ensure verifyOtp is a function in AppContext
  const email = data?.email;
  console.log(email);
  
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      toast.error("Please enter the OTP!");
      return;
    }
    
    try {
      const result = await verifyOtp(otp, email); // Awaiting the response
      console.log("OTP Verify Response:", result);

      if (result?.success) {
        toast.success("OTP Verified  Successfully!");
        navigate('/home'); // Change this to the actual route
      } else {
        toast.error(result?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("OTP Verification Error:", error);
    }
  };

  // TODO: Add Resend OTP function
  const handleResendOtp = async () => {
    try {
      // Call your resend OTP API here (Create this function in AppContext)
      toast.info("OTP has been resent!");
    } catch (error) {
      toast.error("Failed to resend OTP.");
      console.error("Resend OTP Error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Verify OTP</h2>
      </div>

      <div className="flex flex-col mb-4">
        <input
          name="verify-otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          required
        />
        <button
          onClick={handleVerifyOtp}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </div>

      <p className="text-xs m-2">
        Resend OTP{' '}
        <span 
          className="text-blue-900 cursor-pointer text-xs hover:text-gray-600"
          onClick={handleResendOtp} // Added Resend OTP function
        >
          click here
        </span>
      </p>
    </>
  );
};

export default VerifyOtp;
