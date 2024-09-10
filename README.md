
---

# 🌾 KisanMitra

Demo Video Link:
https://www.youtube.com/watch?v=aqaDQTVpozY&ab_channel=KevalShah

This project allows users to manage and analyze agricultural data from their farmland using GIS technology. It provides detailed insights on soil health, land characteristics, crop recommendations, weather forecasts, and AI-based analysis for optimal farming decisions.

## 🚀 Features

### 🌍 Farmland Management
- **Multiple Farmlands**: Users can add multiple farmlands to their dashboard.
- **Location Integration**: Add farmlands by searching, using the current device location, or pinpointing on the map.

  ![1fe6bb36-0150-4cfc-a63b-375e36d915e9](https://github.com/user-attachments/assets/7b031788-977c-4c4f-bb19-e15fcd9e6312)

  
### 📊 Dashboard Overview
Each farmland dashboard presents key GIS data, including:
- **Organic Carbon**: Enhances soil structure and fertility.
- **Inorganic Carbon**: Affects soil pH and indicates degradation.
- **Soil Depth**: Determines root zone depth for water and nutrient uptake.
- **NDVI & FNDVI**: Monitor vegetation health and crop growth.
- **Soil Texture**: Influences water retention and crop suitability.
- **Rabi-Kharif-Fallow Patterns**: Indicate crop rotation and land usage.
- **Land Degradation Factors**: Salt-affected soil, water erosion, wind erosion.
- **Soil Moisture & Water Logging**: Affect irrigation needs and crop yields.
- **Vegetation Fraction**: Insights into land cover and conservation.
- **Forest Cover & Fire Risk**: Critical for long-term productivity.

![8eaefe00-f447-48c2-9f9e-2d170f32de8f](https://github.com/user-attachments/assets/4e116689-15f4-441d-a611-9c651c6e94e3)

![94d89d80-7736-4bc5-a83f-74506a064a37 2](https://github.com/user-attachments/assets/d17bd35a-c423-4379-8ec4-1ecf235a513e)

![4e69c38e-74f9-4d94-b0d5-2ddf41c7a117 2](https://github.com/user-attachments/assets/14e18206-1f0e-4461-ad17-1ffe4cc5cda6)

### ⛅ Weather Forecast
- 7-day forecast for the farmland's location.
- **Warnings for anomalies** like drought, heavy rain, or fire risks to mitigate threats.

### 💡 AI Insights
- **Current Conditions Analysis**: Summarized analysis of soil and land conditions with suggestions for improvement.
- **SWOT Board**: A strategic analysis for Strengths, Weaknesses, Opportunities, and Threats.
- **Crop Recommendations**: Suggests crops like soybean and millet based on the land data.
- **Yield & Profit Estimations**: Provides an estimation of crop yields and profitability based on current data.

![db9257a5-f41b-477f-969a-1bd19be364c6 2](https://github.com/user-attachments/assets/d3e8640e-d1bd-47d3-8a74-32928f3a13e3)
![e7b94d1b-0396-4bae-aa9a-c2f6c7eafe92 2](https://github.com/user-attachments/assets/7a9b07fb-dbe7-4aa7-8ccd-16bb8b560728)

### 🤖 AI-Powered Chatbot
A chatbot is implemented to assist with:
- Querying specific data from the dashboard.
- Explaining GIS terms and soil health indicators.
- Answering questions about crop growth, irrigation, and more.

  <img width="455" alt="Screenshot 2024-09-10 at 3 42 10 PM" src="https://github.com/user-attachments/assets/f3dccefb-751a-4255-b0fa-70b13cddaba4">

### 🌱 Soil Type Prediction (CNN)
- Predict the soil type using a Convolutional Neural Network (CNN) model based on input parameters.
- **Crop Recommendations**: Get recommendations for crops based on predicted soil type.

### 📸 Crop Disease Diagnosis
- Upload a photo of the crop to identify diseases.
- AI model detects and diagnoses the issue with suggestions for treatment and prevention.

  ![d5c5e34a-cd75-4ec0-895a-d1103d079bc9](https://github.com/user-attachments/assets/4234f769-798e-4e5a-bec8-1d0b048ac9a6)

## 🛠 Tech Stack
- **Backend**: Flask API
- **GIS Data Processing**: QGIS, GeoPandas
- **Machine Learning**: TensorFlow, OpenCV (for image processing)
- **Frontend**: React, Mapbox for map integration
- **Database**: PostgreSQL, PostGIS

## 🔍 Key Insights Provided
- Soil fertility, water erosion, crop health, and fire risk assessments.
- Crop management recommendations based on land characteristics.
- Soil moisture levels, evapotranspiration, and weather conditions forecasted for irrigation and water conservation strategies.

## 🎯 How to Use
1. Sign up and log in to the platform.
2. Add farmland using GPS, search, or map.
3. Access the farmland dashboard to view detailed soil and land health insights.
4. Ask the chatbot for specific queries about your farmland or crop management.
5. Upload images to diagnose crop diseases or predict soil types.

## 🔮 Future Enhancements
- **Satellite Integration**: Adding live satellite data for real-time land monitoring.
- **Machine Learning Enhancements**: Improving crop disease detection and soil prediction models.
- **Mobile App Version**: A mobile version for users on the go.

---
