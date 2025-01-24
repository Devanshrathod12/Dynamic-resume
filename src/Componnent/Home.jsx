import React, { useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const isDarkMode = useSelector((state) => state.user.Dark); // Access dark mode state
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    about: "",
    contact: {
      address: "",
      phone: "",
      email: "",
    },
    experience: [],
    education: [],
    skills: [],
    interests: [],
    references: [],
    photo: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResumeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddEntry = (section) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], {}],
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    setResumeData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const renderInputFields = (section) => {
    return (
      <div className="mb-4">
        <h3
          className={`text-lg font-medium mb-2 ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </h3>
        {resumeData[section].map((item, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name={`${section}-${index}`}
              placeholder={`Enter ${section} ${index + 1}`}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md focus:ring-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddEntry(section)}
          className={`px-4 py-2 rounded-md shadow ${
            isDarkMode
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Add {section}
        </button>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Input Section */}
      <div
        className={`w-1/2 p-6 border-r ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Build Resume</h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            } mb-2`}
          />
          <input
            type="text"
            name="title"
            placeholder="Your Title"
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            } mb-2`}
          />
          <textarea
            name="about"
            placeholder="About You"
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            } mb-2`}
          />
        </div>
        {renderInputFields("experience")}
        {renderInputFields("education")}
        {renderInputFields("skills")}
        {renderInputFields("interests")}
        {renderInputFields("references")}
      </div>

      {/* Resume Preview Section */}
      <div
        className={`w-1/2 p-6 ${
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
        <div
          className={`p-6 rounded-lg shadow-md ${
            isDarkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-900"
          }`}
        >
          <h3 className="text-xl font-semibold">{resumeData.name}</h3>
          <h4 className="text-lg">{resumeData.title}</h4>
          <p className="mt-2">{resumeData.about}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
