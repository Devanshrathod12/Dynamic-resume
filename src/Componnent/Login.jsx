import React, { useState } from "react";
import { useAppContext } from "../context/AppContext"; // Import the context to use API calls

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const { loginUser, signupUser } = useAppContext(); // Access API functions from context

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isResetPassword && !isOtpVerification) {
      console.log("Reset Password Request:", data.email);
      setIsOtpVerification(true);
    } else if (isResetPassword && isOtpVerification) {
      console.log("Verify OTP and Reset Password:", data.otp);
    } else {
      console.log(currState, data);
      if (currState === "Login") {
        // Call the login API when Login button is clicked
        await loginUser(data.email, data.password);
      } else if (currState === "Sign Up") {
        // Call the signup API when Sign Up button is clicked
        await signupUser(data.name, data.email, data.password);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-6 w-96">
      <form onSubmit={onSubmitHandler}>
        {!isResetPassword ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{currState}</h2>
            </div>
            <div className="space-y-4">
              {currState === "Sign Up" && (
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  required
                />
              )}
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            >
              {currState === "Sign Up" ? "Create Account" : "Login"}
            </button>
            {currState === "Sign Up" && (
              <div className="flex items-start mt-4">
                <input type="checkbox" required className="mr-2 mt-1" />
                <p className="text-sm text-gray-800 dark:text-gray-400">
                  By continuing, I agree to the terms of use & privacy policy.
                </p>
              </div>
            )}
            {currState === "Login" && (
              <div className="flex justify-start mt-4">
                <button
                  type="button"
                  onClick={() => setIsResetPassword(true)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            {currState === "Login" ? (
              <p className="text-start mt-3 text-sm text-gray-800 dark:text-gray-400">
                Create a new account?{" "}
                <span
                  onClick={() => setCurrState("Sign Up")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p className="text-start mt-3 text-sm text-gray-800 dark:text-gray-400">
                Already have an account?{" "}
                <span
                  onClick={() => setCurrState("Login")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            )}
          </>
        ) : isOtpVerification ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Verify OTP</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We have sent an OTP to your email address. Enter the OTP below to reset your password.
              </p>
              <input
                name="otp"
                onChange={onChangeHandler}
                value={data.otp}
                type="text"
                placeholder="Enter OTP"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
              Don’t receive the OTP?{" "}
              <button className="text-blue-500 hover:underline font-medium">Resend OTP</button>
            </span>
            <p
              className="text-start text-sm mt-2 text-blue-500 cursor-pointer hover:underline"
              onClick={() => setIsOtpVerification(false)}
            >
              Back to Reset Password
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            >
              Verify & Reset Password
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Reset Your Password</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your email address and we’ll send you a password reset link.
              </p>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition"
            >
              Reset Password
            </button>
            <p
              className="text-start mt-4 text-sm text-blue-500 cursor-pointer hover:underline"
              onClick={() => setIsResetPassword(false)}
            >
              Back to Login
            </p>
          </>
        )}
      </form>
    </div>
  </div>
  
  );
};

export default Login;
