import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Predefined modern and ATS-friendly templates
const TEMPLATES = {
  MODERN_CLEAN: {
    name: "Modern Clean",
    backgroundColor: "#ffffff",
    textColor: "#2d3748",
    accentColor: "#3182ce",
    fontFamily: "Arial, sans-serif",
    borderColor: "#e2e8f0",
  },
  DARK_PRO: {
    name: "Dark Professional",
    backgroundColor: "#1a202c",
    textColor: "#e2e8f0",
    accentColor: "#48bb78",
    fontFamily: "Georgia, serif",
    borderColor: "#4a5568",
  },
  MINIMALIST: {
    name: "Minimalist",
    backgroundColor: "#f7fafc",
    textColor: "#4a5568",
    accentColor: "#e53e3e",
    fontFamily: "Helvetica, sans-serif",
    borderColor: "#cbd5e0",
  },
  AI_FRIENDLY: {
    name: "AI-Friendly",
    backgroundColor: "#ffffff",
    textColor: "#1a365d",
    accentColor: "#805ad5",
    fontFamily: "Verdana, sans-serif",
    borderColor: "#e2e8f0",
  },
  CORPORATE: {
    name: "Corporate",
    backgroundColor: "#f0f4f8",
    textColor: "#2d3748",
    accentColor: "#2b6cb0",
    fontFamily: "Times New Roman, serif",
    borderColor: "#cbd5e0",
  },
  VIBRANT: {
    name: "Vibrant",
    backgroundColor: "#fff7ed",
    textColor: "#2d3748",
    accentColor: "#dd6b20",
    fontFamily: "Comic Sans MS, cursive",
    borderColor: "#fed7aa",
  },
  ELEGANT: {
    name: "Elegant",
    backgroundColor: "#faf5ff",
    textColor: "#2d3748",
    accentColor: "#9f7aea",
    fontFamily: "Garamond, serif",
    borderColor: "#d6bcfa",
  },
  TECHY: {
    name: "Techy",
    backgroundColor: "#ebf8ff",
    textColor: "#2d3748",
    accentColor: "#4299e1",
    fontFamily: "Courier New, monospace",
    borderColor: "#bee3f8",
  },
  NATURE: {
    name: "Nature",
    backgroundColor: "#f0fff4",
    textColor: "#2d3748",
    accentColor: "#48bb78",
    fontFamily: "Trebuchet MS, sans-serif",
    borderColor: "#c6f6d5",
  },
  CLASSIC: {
    name: "Classic",
    backgroundColor: "#fffaf0",
    textColor: "#2d3748",
    accentColor: "#ed8936",
    fontFamily: "Palatino, serif",
    borderColor: "#fbd38d",
  },
};

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
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES.MODERN_CLEAN); // Default template

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setResumeData(parsedData);
    }
  }, []);

  // Save data to localStorage whenever it changes
  const handleSave = () => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    alert("Resume saved successfully!");
  };

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
      [section]: [...prevData[section], section === "education" ? { collegeName: "", degree: "", startDate: "", endDate: "" } : { value: "" }],
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

  const handleTemplateChange = (templateName) => {
    setSelectedTemplate(TEMPLATES[templateName]);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("resume-preview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size
      pdf.save("resume.pdf");
    });
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
            {section === "education" ? (
              <>
                <input
                  type="text"
                  name="collegeName"
                  value={item.collegeName}
                  placeholder="College Name"
                  onChange={(e) => handleSectionChange(e, section, index)}
                  className={`w-full p-2 border rounded-md focus:ring-2 mb-2 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                  }`}
                />
                <input
                  type="text"
                  name="degree"
                  value={item.degree}
                  placeholder="Degree"
                  onChange={(e) => handleSectionChange(e, section, index)}
                  className={`w-full p-2 border rounded-md focus:ring-2 mb-2 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                  }`}
                />
                <input
                  type="text"
                  name="startDate"
                  value={item.startDate}
                  placeholder="Start Date"
                  onChange={(e) => handleSectionChange(e, section, index)}
                  className={`w-full p-2 border rounded-md focus:ring-2 mb-2 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                      : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
                  }`}
                />
                <input
                  type="text"
                  name="endDate"
                  value={item.endDate}
                  placeholder="End Date"
                  onChange={(e) => handleSectionChange(e, section, index)}
                  className={`w-full p-2 border rounded-md focus:ring-2 mb-2 ${
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
              </>
            ) : (
              <div className="flex items-center">
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
            )}
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
          <label className="block text-sm font-medium mb-2">Choose Template</label>
          <select
            onChange={(e) => handleTemplateChange(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500"
                : "border-gray-300 bg-white text-gray-900 focus:ring-blue-500"
            }`}
          >
            {Object.keys(TEMPLATES).map((key) => (
              <option key={key} value={key}>
                {TEMPLATES[key].name}
              </option>
            ))}
          </select>
        </div>
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
        <button
          onClick={handleSave}
          className={`mt-4 px-4 py-2 rounded-md shadow ${
            isDarkMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Save Resume
        </button>
      </div>

      {/* Resume Preview Section */}
      <div
        className={`w-1/2 p-6 overflow-y-auto`}
        style={{
          backgroundColor: selectedTemplate.backgroundColor,
          color: selectedTemplate.textColor,
          fontFamily: selectedTemplate.fontFamily,
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
        <div
          id="resume-preview"
          className={`p-6 rounded-lg shadow-md`}
          style={{
            backgroundColor: isDarkMode ? "#374151" : selectedTemplate.backgroundColor,
            color: selectedTemplate.textColor,
            border: `1px solid ${selectedTemplate.borderColor}`,
          }}
        >
          {/* Header Section */}
          <div className="flex items-center mb-6">
            {resumeData.photo && (
              <img
                src={URL.createObjectURL(resumeData.photo)}
                alt="Resume"
                className="w-24 h-24 rounded-full object-cover border mr-4"
                style={{ borderColor: selectedTemplate.accentColor }}
              />
            )}
            <div>
              <h3 className="text-2xl font-bold">{resumeData.name || "Your Name"}</h3>
              <p className="text-lg font-medium" style={{ color: selectedTemplate.accentColor }}>
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
                      <li key={index}>
                        {section === "education" ? (
                          <>
                            <strong>{item.collegeName}</strong> - {item.degree} ({item.startDate} - {item.endDate})
                          </>
                        ) : (
                          item.value
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
        <button
          onClick={handleDownloadPDF}
          className={`mt-4 px-4 py-2 rounded-md shadow ${
            isDarkMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}


export default Home;