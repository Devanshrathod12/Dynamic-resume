# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


````````
app.jsx
priveus 
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