import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Insights from './Insights';
import Chatbot from './Chatbot';
import Navbar from "./Navbar"
// CropDashboard Component
const CropDashboard = () => {
  const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating an API call with setTimeout
      setTimeout(() => {
        const simulatedData = {
          "nearest_city": "Farmville",
          "lat_long": "40.7128,-74.0060",
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
          "fire_risk": 0.02,
          "surface_runoff": 0.1,          "soil_moisture": 1.2,
          "evapotranspiration": 3
        };
        setData(simulatedData);
        fetchWeatherData(simulatedData.lat_long);
      }, 1000); // Simulate a 1 second delay
    };

    fetchData();
  }, []);

  const fetchWeatherData = async (latLong) => {
    const API_KEY = '';
    const [lat, lon] = latLong.split(',').map(coord => parseFloat(coord));
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data.list.slice(0, 7)); // Get weather for next 7 days
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  if (!data) return <div className="flex items-center justify-center h-screen bg-white text-black">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-black p-8 relative overflow-hidden">
      <div className="relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <LeafIcon className="w-8 h-8 mr-4 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Crop Dashboard</h1>
          </div>
          <div className="flex items-center">
            <input type="text" placeholder="Search..." className="px-4 py-2 rounded-lg bg-emerald-100 text-black border border-green-300 focus:outline-none focus:border-green-500 transition-colors duration-300" />
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Open Chatbot
            </button>
          </div>
        </header>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          <InfoCard 
            icon={<MapPinIcon className="w-6 h-6" />} 
            title="Location" 
            value={`${data.nearest_city} (${data.lat_long})`} 
            info="The nearest city to the crop area and its geographical coordinates."
          />
          <InfoCard 
            icon={<CalendarIcon className="w-6 h-6" />} 
            title="Date & Season" 
            value={`${data.date} - ${data.season}`} 
            info="The current date and season, which are crucial for crop planning and management."
          />
          <InfoCard 
            icon={<DropletIcon className="w-6 h-6" />} 
            title="Soil Type" 
            value={data.soil_type} 
            info="The type of soil in the crop area, which affects water retention, nutrient availability, and crop suitability."
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2" info="Soil composition affects nutrient availability and water retention capacity.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Soil Composition</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: 'Organic', value: data.mean_soil_cd.org },
                { name: 'Inorganic', value: data.mean_soil_cd.inorg },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#333" />
                <YAxis stroke="#333" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E0E0E0' }} />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-600">Depth</p>
                <p className="text-xl font-bold text-green-800">{data.depth} cm</p>
              </div>
              <div>
                <p className="text-sm text-green-600">Texture</p>
                <p className="text-xl font-bold text-green-800">{data.texture}</p>
              </div>
            </div>
          </Card>
       
          <Card info="Land characteristics provide insights into vegetation health and coverage.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Land Characteristics</h2>
            <div className="space-y-2">
              <InfoItem label="NSA" value={`${data.nsa.toFixed(2)}%`} info="Net Sown Area: The total area sown with crops." />
              <InfoItem label="WBF" value={`${data.wbf.toFixed(2)}%`} info="Water Body Fraction: The percentage of land covered by water bodies." />
              <InfoItem label="NDVI" value={data.ndvi.toFixed(4)} info="Normalized Difference Vegetation Index: An indicator of plant health and density." />
              <InfoItem label="FNDVI" value={data.fndvi.toFixed(4)} info="Fractional NDVI: A more detailed measure of vegetation cover." />
              <InfoItem label="Vegetation Fraction" value={`${data.vf.toFixed(2)}%`} info="The percentage of land covered by vegetation." />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card info="Land degradation factors affect soil quality and crop productivity.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Land Degradation</h2>
            <div className="space-y-2">
              <InfoItem label="Salt Affected" value={`${data.land_degradation.salt_affected.toFixed(2)}%`} info="Percentage of land affected by salt accumulation." />
              <InfoItem label="Water Erosion" value={`${data.land_degradation.water_erosion.toFixed(2)}%`} info="Percentage of land affected by water erosion." />
              <InfoItem label="Water Logging" value={`${data.land_degradation.water_logging.toFixed(2)}%`} info="Percentage of land affected by water logging." />
              <InfoItem label="Wind Erosion" value={`${data.land_degradation.wind_erosion.toFixed(2)}%`} info="Percentage of land affected by wind erosion." />
            </div>
          </Card>
          <Card info="Forest cover and fire risk are important factors in land management.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Forest Information</h2>
            <div className="flex items-center justify-between mb-4">
              <TreeIcon className="w-12 h-12 text-green-600" />
              <div className="text-right">
                <p className="text-3xl font-bold text-green-800">{data.forest_cover.toFixed(2)}%</p>
                <p className="text-sm text-green-600">Forest Cover</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <FireIcon className="w-12 h-12 text-red-600" />
              <div className="text-right">
                <p className="text-3xl font-bold text-red-600">{(data.fire_risk * 100).toFixed(2)}%</p>
                <p className="text-sm text-red-600">Fire Risk</p>
              </div>
            </div>
          </Card>
          <Card info="Weather forecast helps in planning agricultural activities.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Weather Forecast</h2>
            {weatherData ? (
              <div className="grid grid-cols-3 gap-2 text-sm">
                {weatherData.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString()}</p>
                    <WeatherIcon icon={day.weather[0].icon} />
                    <p>{day.main.temp.toFixed(1)}°C</p>
                    <p className="text-xs">{day.weather[0].description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card info="Surface runoff is the flow of water that occurs on the ground surface when excess rainwater can no longer be absorbed by the soil.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Surface Runoff</h2>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{data.surface_runoff.toFixed(2)} mm/day</p>
                <p className="text-sm text-blue-600">Average Surface Runoff</p>
              </div>
            </div>
          </Card>
          <Card info="Soil moisture is the water content held in the soil, crucial for plant growth and agricultural productivity.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Soil Moisture</h2>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-brown-600">{data.soil_moisture.toFixed(2)} m³/m³</p>
                <p className="text-sm text-brown-600">Average Soil Moisture</p>
              </div>
            </div>
          </Card>
          <Card info="Evapotranspiration is the process by which water is transferred from the land to the atmosphere by evaporation from the soil and transpiration from plants.">
            <h2 className="text-xl font-semibold mb-4 text-green-800">Evapotranspiration</h2>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{data.evapotranspiration.toFixed(2)} mm/day</p>
                <p className="text-sm text-green-600">Average Evapotranspiration</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <Insights data={data} />
        </div>
      </div>

      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        theme={{ primary: 'green' }}
        userAvatar="/path-to-user-avatar.png"
        dashboardData={data}
      />
    </div>
  </>
  );
};

// Card, InfoCard, InfoItem, InfoIcon, and WeatherIcon components remain the same

// InfoCard Component
const Card = ({ children, className, info }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 relative ${className}`}>
    <InfoIcon info={info} />
    {children}
  </div>
);

// InfoCard Component
const InfoCard = ({ icon, title, value, info }) => (
  <Card className="text-center" info={info}>
    <div className="flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-green-800">{title}</h3>
    <p className="text-lg text-gray-600">{value}</p>
  </Card>
);
// InfoItem Component
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-gray-700">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);
const InfoIcon = ({ info }) => (
  <div className="absolute top-2 right-2 group">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
    <div className="absolute right-0 w-64 p-2 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10">
      <p className="text-sm text-gray-600">{info}</p>
    </div>
  </div>
);
// WeatherIcon Component

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
    <line x1="12" y1="13" x2="12" y2="22" />
  </svg>
);

const FireIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const CrossIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MinimizeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const WeatherIcon = ({ icon }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return <img src={iconUrl} alt="Weather icon" className="w-12 h-12 mx-auto" />;
};

export default CropDashboard;
