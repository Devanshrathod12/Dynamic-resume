// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ToggleDarkMod } from "./Redux/ReduxSlice";
// import Login from "./Componnent/Login"; // Login component import
// import { AppProvider } from "./context/AppContext"; // Import AppProvider

// const App = () => {
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector((state) => state.user.Dark); // Redux state for dark mode

//   const toggleColorMod = () => {
//     dispatch(ToggleDarkMod(!isDarkMode)); // Toggle dark mode in Redux
//   };

//   return (
//     <AppProvider>
//       <div
//         className={`${
//           isDarkMode ? "dark" : "light"
//         } min-h-screen transition-colors duration-300`}
//       >
//         {/* Dark/Light Mode Toggle Button */}
//         <button
//           onClick={toggleColorMod}
//           className="px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-600 transition"
//         >
//           {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//         </button>
//         <Login />
//       </div>
//     </AppProvider>
//   );
// };

// export default App;


/*--------------------------------------------------------------------*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDarkMod } from "./Redux/ReduxSlice";
import Login from "./Componnent/Login"; // Login component import
import Home from "./Componnent/Home"; // Home component import
import { AppProvider } from "./context/AppContext"; // Import AppProvider
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.user.Dark); // Redux state for dark mode

  const toggleColorMod = () => {
    dispatch(ToggleDarkMod(!isDarkMode)); // Toggle dark mode in Redux
  };

  // Apply dark/light class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
      <Router>
    <AppProvider>
        <div className="min-h-screen transition-colors duration-300 flex flex-col items-center justify-center relative">
          {/* Dark/Light Mode Toggle Button with Label */}
         <ToastContainer/>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            {/* Label */}
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>

            {/* Toggle Button */}
            <button
              onClick={toggleColorMod}
              className={`w-14 h-8 flex items-center rounded-full shadow-lg transition-all duration-300 ${
                isDarkMode ? "bg-gray-700 justify-end" : "bg-gray-300 justify-start"
              }`}
              aria-label="Toggle Dark/Light Mode"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  isDarkMode ? "scale-110" : "scale-100"
                }`}
              ></div>
            </button>
          </div>

          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
    </AppProvider>
      </Router>
  );
};

export default App;

