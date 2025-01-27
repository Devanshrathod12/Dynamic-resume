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

  const handleSectionChange = (event, section, index) => {
    const { name, value } = event.target;
    setResumeData((prevData) => {
      const updatedSection = [...prevData[section]];
      updatedSection[index][name] = value;
      return { ...prevData, [section]: updatedSection };
    });
  };

  const handleAddEntry = (section) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], { value: "" }],
    }));
  };

  const handleRemoveEntry = (section, index) => {
    setResumeData((prevData) => {
      const updatedSection = [...prevData[section]];
      updatedSection.splice(index, 1); // Remove the selected entry
      return { ...prevData, [section]: updatedSection };
    });
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
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              name="value"
              value={item.value}
              placeholder={`Enter ${section} ${index + 1}`}
              onChange={(e) => handleSectionChange(e, section, index)}
              className={`flex-grow p-2 border rounded-md focus:ring-2 mr-2 ${
                isDarkMode
                  ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                  : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => handleRemoveEntry(section, index)}
              className={`px-3 py-1 rounded-md shadow ${
                isDarkMode
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              X
            </button>
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

  const renderSectionPreview = (section) => {
    return (
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </h3>
        <ul className="list-disc pl-5">
          {resumeData[section].map((item, index) => (
            <li key={index}>{item.value}</li>
          ))}
        </ul>
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
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          
        </div>
        {renderInputFields("experience")}
        {renderInputFields("education")}
        {renderInputFields("skills")}
        {renderInputFields("interests")}
        {renderInputFields("references")}
      </div>

      {/* Resume Preview Section */}
      {/* Resume Preview Section */}
<div
  className={`w-1/2 p-6 overflow-y-auto ${
    isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-900"
  }`}
>
  <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
  <div
    className={`p-6 rounded-lg shadow-md ${
      isDarkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-900"
    }`}
  >
    {/* Header Section */}
    <div className="flex items-center mb-6">
      {resumeData.photo && (
        <img
          src={URL.createObjectURL(resumeData.photo)}
          alt="Resume"
          className="w-24 h-24 rounded-full object-cover border mr-4"
        />
      )}
      <div>
        <h3 className="text-2xl font-bold">{resumeData.name || "Your Name"}</h3>
        <p className="text-lg font-medium text-gray-500">
          {resumeData.title || "Your Title"}
        </p>
      </div>
    </div>

    {/* About Section */}
    {resumeData.about && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold">About Me</h3>
        <p className="text-sm">{resumeData.about}</p>
      </div>
    )}

    {/* Contact Information */}
    {resumeData.contact && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <ul className="text-sm">
          {resumeData.contact.address && (
            <li>📍 {resumeData.contact.address}</li>
          )}
          {resumeData.contact.phone && <li>📞 {resumeData.contact.phone}</li>}
          {resumeData.contact.email && <li>📧 {resumeData.contact.email}</li>}
        </ul>
      </div>
    )}

    {/* Dynamic Sections */}
    {["experience", "education", "skills", "interests", "references"].map(
      (section) =>
        resumeData[section]?.length > 0 && (
          <div key={section} className="mb-6">
            <h3 className="text-lg font-semibold">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </h3>
            <ul className="list-disc pl-5 text-sm">
              {resumeData[section].map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
          </div>
        )
    )}
  </div>
</div>

    </div>
  );
}

export default Home;
