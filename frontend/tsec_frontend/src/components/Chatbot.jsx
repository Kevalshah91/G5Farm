import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';

const languages = {
  en: {
    name: "English",
    title: "Kisan Mitra: Your Farming Companion",
    subtitle: "Ask me anything about farming!",
    chatPlaceholder: "Type your farming question here...",
    sendButton: "Send",
    loadingMessage: "Thinking...",
    welcomeMessage: "Welcome! How can I assist you with your farming needs today?",
    selectLanguage: "Select Language",
  },
  hi: {
    name: "हिंदी",
    title: "किसान मित्र: आपका कृषि साथी",
    subtitle: "खेती के बारे में कुछ भी पूछें!",
    chatPlaceholder: "अपना कृषि प्रश्न यहाँ टाइप करें...",
    sendButton: "भेजें",
    loadingMessage: "सोच रहा हूँ...",
    welcomeMessage: "स्वागत है! आज मैं आपकी कृषि आवश्यकताओं में कैसे सहायता कर सकता हूँ?",
    selectLanguage: "भाषा चुनें",
  },
  // Add more languages as needed
};

const Chatbot = ({ isOpen, onClose, theme, userAvatar }) => {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generativeAI, setGenerativeAI] = useState(null);
  const messagesEndRef = useRef(null);

  const t = languages[language] || languages.en;

  useEffect(() => {
    const genAI = new GoogleGenerativeAI("AIzaSyDunfDQjPX1kXB9Swdrt9jPcDEkm-6haKc");
    setGenerativeAI(genAI);
    setMessages([{ role: 'assistant', content: t.welcomeMessage }]);
  }, [t.welcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = async (prompt) => {
    if (!generativeAI) return 'AI model not initialized. Please try again.';
    try {
      const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error generating content:', error);
      return 'Failed to generate content. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    const context = messages.slice(-10).map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const prompt = `
      You are Kisan Mitra, an AI assistant specialized in helping farmers. Provide helpful and concise answers to farming-related questions. If a question is not related to farming, politely steer the conversation back to agricultural topics. Respond in ${languages[language].name}.

      Context:
      ${context}

      User: ${userMessage}

      Assistant: Provide a helpful response based on the context and the user's question. If there's not enough context, ask for clarification.
    `;

    const response = await getResponse(prompt);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50`}
        >
          <div className={`bg-${theme.primary}-600 p-4 flex justify-between items-center`}>
            <h2 className="text-xl font-bold text-white">{t.title}</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <span className="sr-only">Close chat</span>
              &times;
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-3/4 p-3 rounded-lg ${
                    message.role === 'user'
                      ? `bg-${theme.primary}-200 text-${theme.primary}-900`
                      : `bg-white text-gray-900 border border-${theme.primary}-300`
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`max-w-3/4 p-3 rounded-lg bg-white text-gray-900 border border-${theme.primary}-300`}>
                  {t.loadingMessage}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`mr-2 rounded-lg border-gray-300 shadow-sm focus:border-${theme.primary}-500 focus:ring-${theme.primary}-500 text-sm`}
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                className={`flex-grow rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-${theme.primary}-600`}
              />
              <button
                type="submit"
                className={`bg-${theme.primary}-600 text-white p-2 rounded-r-lg hover:bg-${theme.primary}-700 focus:outline-none focus:ring-2 focus:ring-${theme.primary}-600`}
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
