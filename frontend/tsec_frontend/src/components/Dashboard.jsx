import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';

const CropDashboard = () => {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState('green');
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Simulated API call - replace with actual API endpoint later
    setData({
      "nearest_city": "Farmville",
      "lat_long": "40.7128° N, 74.0060° W",
      "date": "2023-08-30",
      "season": "Summer",
      "soil_type": "Loamy",
      "mean_soil_cd": {
        "org": 8.46455,
        "inorg": 7.585656
      },
      "depth": 100,
      "texture": "Fine",
      "nsa": 79.07346654737051,
      "wbf": 0,
      "ndvi": -0.403921568627451,
      "fndvi": -0.5450980392156863,
      "vf": 25.49019607843137,
      "land_degradation": {
        "salt_affected": 0,
        "water_erosion": 1.6099999999999999,
        "water_logging": 0,
        "wind_erosion": 0
      },
      "forest_cover": 4.8462,
      "fire_risk": 0.02
    });

    // Change theme color every 10 seconds
    const interval = setInterval(() => {
      setTheme(prevTheme => prevTheme === 'green' ? 'green' : 'green');
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="flex items-center justify-center h-screen bg-white text-black">Loading...</div>;

  const themeColors = {
    primary: theme === 'green' ? 'green' : 'blue',
    secondary: theme === 'green' ? 'emerald' : 'sky',
    accent: theme === 'green' ? 'lime' : 'indigo',
  };

  return (
    
    <motion.div 
      className={`min-h-screen bg-gradient-to-br from-${themeColors.primary}-50 to-${themeColors.secondary}-100 text-black p-8 relative overflow-hidden`}
      animate={{ backgroundColor: theme === 'green' ? '#f0fff4' : '#e6f7ff' }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-10">
        <motion.header 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <LeafIcon className={`w-10 h-10 mr-4 text-${themeColors.primary}-600`} />
            <h1 className={`text-3xl font-bold text-${themeColors.primary}-800`}>Crop Dashboard</h1>
          </div>
          <div className="flex items-center">
            <input type="text" placeholder="Search..." className={`px-4 py-2 rounded-lg bg-${themeColors.secondary}-100 text-black border border-${themeColors.primary}-300 focus:outline-none focus:border-${themeColors.primary}-500 transition-colors duration-300`} />
          </div>
        </motion.header>
        

        <div className="grid grid-cols-3 gap-6 mb-8">
          <InfoCard icon={<MapPinIcon />} title="Location" value={`${data.nearest_city} (${data.lat_long})`} theme={themeColors} />
          <InfoCard icon={<CalendarIcon />} title="Date & Season" value={`${data.date} - ${data.season}`} theme={themeColors} />
          <InfoCard icon={<DropletIcon />} title="Soil Type" value={data.soil_type} theme={themeColors} />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2" theme={themeColors}>
            <h2 className={`text-xl font-semibold mb-4 text-${themeColors.primary}-800`}>Soil Composition</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Organic', value: data.mean_soil_cd.org },
                { name: 'Inorganic', value: data.mean_soil_cd.inorg },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#333" />
                <YAxis stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E0E0E0' }} />
                <Bar dataKey="value" fill={theme === 'green' ? "#4CAF50" : "#3498db"} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm text-${themeColors.primary}-600`}>Depth</p>
                <p className={`text-xl font-bold text-${themeColors.primary}-800`}>{data.depth} cm</p>
              </div>
              <div>
                <p className={`text-sm text-${themeColors.primary}-600`}>Texture</p>
                <p className={`text-xl font-bold text-${themeColors.primary}-800`}>{data.texture}</p>
              </div>
            </div>
          </Card>
          <Card theme={themeColors}>
            <h2 className={`text-xl font-semibold mb-4 text-${themeColors.primary}-800`}>Land Characteristics</h2>
            <div className="space-y-2">
              <InfoItem label="NSA" value={`${data.nsa.toFixed(2)}%`} theme={themeColors} />
              <InfoItem label="WBF" value={`${data.wbf.toFixed(2)}%`} theme={themeColors} />
              <InfoItem label="NDVI" value={data.ndvi.toFixed(4)} theme={themeColors} />
              <InfoItem label="FNDVI" value={data.fndvi.toFixed(4)} theme={themeColors} />
              <InfoItem label="Vegetation Fraction" value={`${data.vf.toFixed(2)}%`} theme={themeColors} />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card theme={themeColors}>
            <h2 className={`text-xl font-semibold mb-4 text-${themeColors.primary}-800`}>Land Degradation</h2>
            <div className="space-y-2">
              <InfoItem label="Salt Affected" value={`${data.land_degradation.salt_affected.toFixed(2)}%`} theme={themeColors} />
              <InfoItem label="Water Erosion" value={`${data.land_degradation.water_erosion.toFixed(2)}%`} theme={themeColors} />
              <InfoItem label="Water Logging" value={`${data.land_degradation.water_logging.toFixed(2)}%`} theme={themeColors} />
              <InfoItem label="Wind Erosion" value={`${data.land_degradation.wind_erosion.toFixed(2)}%`} theme={themeColors} />
            </div>
          </Card>
          <Card theme={themeColors}>
            <h2 className={`text-xl font-semibold mb-4 text-${themeColors.primary}-800`}>Forest Information</h2>
            <div className="flex items-center justify-between mb-4">
              <TreeIcon className={`w-12 h-12 text-${themeColors.primary}-600`} />
              <div className="text-right">
                <p className={`text-3xl font-bold text-${themeColors.primary}-800`}>{data.forest_cover.toFixed(2)}%</p>
                <p className={`text-sm text-${themeColors.primary}-600`}>Forest Cover</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <FireIcon className={`w-12 h-12 text-${themeColors.accent}-600`} />
              <div className="text-right">
                <p className={`text-3xl font-bold text-${themeColors.accent}-600`}>{(data.fire_risk * 100).toFixed(2)}%</p>
                <p className={`text-sm text-${themeColors.accent}-600`}>Fire Risk</p>
              </div>
            </div>
          </Card>
          <Card theme={themeColors}>
            <h2 className={`text-xl font-semibold mb-4 text-${themeColors.primary}-800`}>Recommendations</h2>
            <p className="text-gray-700">Based on the soil composition and land characteristics, consider planting drought-resistant crops and implementing erosion control measures.</p>
          </Card>
        </div>

        <Card className="mb-8" theme={themeColors}>
          <h2 className={`text-xl font-semibold mb-4 text-${themeColors.primary}-800`}>Crop Disease Identification</h2>
          <p className="text-gray-700 mb-4">Upload an image of your crop to identify potential diseases and get treatment recommendations.</p>
          <motion.button 
            className={`bg-${themeColors.primary}-500 hover:bg-${themeColors.primary}-400 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Image
          </motion.button>
        </Card>
      </div>
      <button 
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full bg-${themeColors.primary}-600 flex items-center justify-center shadow-lg text-white transition-transform transform hover:scale-105`} 
        onClick={() => setShowChatbot(!showChatbot)}
      >
        
      </button>

      {/* Conditionally Render Chatbot Component */}
      {showChatbot && <Chatbot />}
    </motion.div>
  );
};

const Card = ({ children, className = '', theme }) => (
  <motion.div 
    className={`bg-white rounded-xl p-6 shadow-lg ${className}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` }}
  >
    {children}
  </motion.div>
);

const InfoCard = ({ icon, title, value, theme }) => (
  <Card theme={theme}>
    <div className="flex items-center">
      <div className={`bg-${theme.secondary}-100 p-3 rounded-full mr-4 text-${theme.primary}-600`}>{icon}</div>
      <div>
        <h3 className={`text-${theme.primary}-600 text-sm mb-1`}>{title}</h3>
        <p className={`text-xl font-bold text-${theme.primary}-800`}>{value}</p>
      </div>
    </div>
  </Card>
);

const InfoItem = ({ label, value, theme }) => (
  <div className="flex justify-between">
    <span className={`text-${theme.primary}-600`}>{label}</span>
    <span className={`font-semibold text-${theme.primary}-800`}>{value}</span>
  </div>
);

// SVG icons
const LeafIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DropletIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const TreeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 22v-5l5-5-5-5V3" />
    <path d="M7 3v4l-5 5 5 5v5" />
    <path d="M12 12l5 5" />
    <path d="M12 12l-5 5" />
    <path d="M12 12V3" />
  </svg>
);

const FireIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export default CropDashboard;