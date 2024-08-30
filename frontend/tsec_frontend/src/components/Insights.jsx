import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Insights = ({ data }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const genAI = new GoogleGenerativeAI("AIzaSyDunfDQjPX1kXB9Swdrt9jPcDEkm-6haKc");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        As an agricultural expert, analyze the following crop and environmental data:
        
        - Nearest city: ${data.nearest_city}
        - Location: ${data.lat_long}
        - Date: ${data.date}
        - Season: ${data.season}
        - Soil type: ${data.soil_type}
        - Mean soil organic content: ${data.mean_soil_cd.org}
        - Mean soil inorganic content: ${data.mean_soil_cd.inorg}
        - Soil depth: ${data.depth} cm
        - Soil texture: ${data.texture}
        - NSA: ${data.nsa}%
        - WBF: ${data.wbf}%
        - NDVI: ${data.ndvi}
        - FNDVI: ${data.fndvi}
        - Vegetation fraction: ${data.vf}%
        - Land degradation:
          * Salt affected: ${data.land_degradation.salt_affected}%
          * Water erosion: ${data.land_degradation.water_erosion}%
          * Water logging: ${data.land_degradation.water_logging}%
          * Wind erosion: ${data.land_degradation.wind_erosion}%
        - Forest cover: ${data.forest_cover}%
        - Fire risk: ${data.fire_risk * 100}%

        Based on this data, provide:
        1. A brief analysis of the current conditions
        2. Three key insights about the land and its potential for agriculture
        3. Two specific crop recommendations suitable for these conditions
        4. Three actionable tips for improving soil health and crop yield
        5. An estimate of potential crop yield (high/medium/low) with a brief explanation

        Format the response in markdown, using headers for each section.
        Provide me in point wise and remove the ## from it 
      `;

      try {
        const result = await model.generateContent(prompt);
        setInsights(result.response.text());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInsights();
  }, [data]);

  if (loading) return <div>Loading insights...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Agricultural Insights</h2>
      <div className="prose" dangerouslySetInnerHTML={{ __html: insights }} />
    </div>
  );
};

export default Insights;