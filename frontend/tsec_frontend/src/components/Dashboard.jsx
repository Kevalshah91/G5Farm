import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-emerald-800 mb-8 text-center"
        >
          Welcome to G5Farm Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Add your dashboard content here */}
          <DashboardCard title="Farm Analytics" icon="📊" />
          <DashboardCard title="Crop Management" icon="🌾" />
          <DashboardCard title="Weather Forecast" icon="🌤️" />
          <DashboardCard title="Equipment Tracking" icon="🚜" />
          <DashboardCard title="Market Prices" icon="💹" />
          <DashboardCard title="Task Management" icon="📝" />
        </motion.div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-emerald-700">{title}</h2>
      <p className="text-emerald-600 mt-2">Click to view details</p>
    </motion.div>
  );
};

export default Dashboard;