import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import AuthForm from "./auth/AuthForm";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot"; // Make sure to import the Chatbot component
import { FaRobot } from "react-icons/fa";

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Define theme and userAvatar (you can adjust these as needed)
  const theme = {
    primary: "blue", // or any color that matches your design
  };
  const userAvatar = "path/to/user-avatar.png"; // Replace with actual path if you have a user avatar

  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>

        {/* Chatbot toggle button */}
        <button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out z-50"
        >
          <span className="flex items-center justify-center h-12 w-12">
            <FaRobot className="h-6 w-6" />
          </span>
        </button>

        {/* Chatbot component */}
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          theme={theme}
          userAvatar={userAvatar}
        />
      </div>
    </Router>
  );
};

export default App;
