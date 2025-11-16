import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const breakEvenPrices = {
  "Bajra(Pearl Millet/Cumbu)": 1703,
  "Barley (Jau)": 1361,
  "Black Gram (Urd Beans)(Whole)": 5114,
  "Chili Red": 8000,
  "Copra": 7721,
  "Gram Raw(Chholia)": 3699,
  "Green Gram (Moong)(Whole)": 5845,
  "Groundnut": 4842,
  "Jowar(Sorghum)": 2466,
  "Lentil (Masur)(Whole)": 3705,
  "Maize": 1508,
  "Mustard": 3210,
  "Niger Seed (Ramtil)": 6358,
  "Onion": 1750,
  "Paddy(Dhan)(Common)": 1579,
  "Pegeon Pea (Arhar Fali)": 5038,
  "Potato": 400,
  "Ragi (Finger Millet)": 3257,
  "Safflower": 4360,
  "Sesamum(Sesame,Gingelly,Til)": 6564,
  "Soyabean": 3552,
  "Sugarcane": 173,
  "Sunflower": 5147,
  "Tomato": 2000,
  "wheat": 1200
};

const cropData = [
  {"District Name": "Agra", "Market Name": "Achnera", "Commodity": "Bajra(Pearl Millet/Cumbu)", "Variety": "Hybrid", "Grade": "FAQ"},
  {"Commodity": "Barley (Jau)", "District Name": "Agra", "Grade": "FAQ", "Market Name": "Achnera", "Variety": "Hybrid"},
  {"Commodity": "Black Gram (Urd Beans)(Whole)", "District Name": "Adilabad", "Grade": "FAQ", "Market Name": "Bhainsa", "Variety": "Hybrid"},
  {"Commodity": "Chili Red", "District Name": "Khammam", "Grade": "FAQ", "Market Name": "Bhadrachalam", "Variety": "Hybrid"},
  {"Commodity": "Copra", "District Name": "Idukki", "Grade": "FAQ", "Market Name": "Thodupuzha", "Variety": "Hybrid"},
  {"Commodity": "Gram Raw(Chholia)", "District Name": "Faridkot", "Grade": "FAQ", "Market Name": "Jaitu", "Variety": "Hybrid"},
  {"District Name": "Adilabad", "Market Name": "Bhainsa", "Commodity": "Green Gram (Moong)(Whole)", "Variety": "Hybrid", "Grade": "FAQ"},
  {"Commodity": "Groundnut", "District Name": "Ahmednagar", "Grade": "FAQ", "Market Name": "Jamkhed", "Variety": "Hybrid"},
  {"Commodity": "Jowar(Sorghum)", "District Name": "Khammam", "Grade": "FAQ", "Market Name": "Bhadrachalam", "Variety": "Hybrid"},
  {"Commodity": "Lentil (Masur)(Whole)", "District Name": "Bareilly", "Grade": "FAQ", "Market Name": "Bareilly", "Variety": "Hybrid"},
  {"Commodity": "Maize", "District Name": "Adilabad", "Grade": "FAQ", "Market Name": "Sarangapur", "Variety": "Hybrid"},
  {"Commodity": "Mustard", "District Name": "Adilabad", "Grade": "FAQ", "Market Name": "Bhainsa", "Variety": "Hybrid"},
  {"Commodity": "Niger Seed (Ramtil)", "District Name": "Bilaspur", "Grade": "FAQ", "Market Name": "Pendraroad", "Variety": "Hybrid"},
  {"Commodity": "Onion", "District Name": "Agra", "Grade": "FAQ", "Market Name": "Achnera", "Variety": "Hybrid"},
  {"Commodity": "Paddy(Dhan)(Common)", "District Name": "Anand", "Grade": "FAQ","Market Name": "Borsad", "Variety": "Hybrid"},
  {"Commodity": "Pegeon Pea (Arhar Fali)", "District Name": "Anand", "Grade": "FAQ", "Market Name": "Khambhat(Veg Yard Khambhat)", "Variety": "Hybrid"},
  {"Commodity": "Potato", "District Name": "Adilabad", "Grade": "FAQ", "Market Name": "Jainath", "Variety": "Hybrid"},
  {"Commodity": "Ragi (Finger Millet)", "District Name": "Coimbatore", "Grade": "FAQ", "Market Name": "Karamadai", "Variety": "Hybrid"},
  {"Commodity": "Safflower", "District Name": "Ahmednagar", "Grade": "FAQ", "Market Name": "Ahmednagar", "Variety": "Hybrid"},
  {"Commodity": "Sesamum(Sesame,Gingelly,Til)", "District Name": "Karimnagar", "Grade": "FAQ", "Market Name": "Jagtial", "Variety": "Hybrid"},
  {"Commodity": "Soyabean", "District Name": "Dharwad", "Grade": "FAQ", "Market Name": "Dharwar", "Variety": "Hybrid"},
  {"Commodity": "Sugarcane", "District Name": "Balrampur", "Grade": "FAQ", "Market Name": "Kusmee", "Variety": "Hybrid"},
  {"Commodity": "Sunflower", "District Name": "Khammam", "Grade": "FAQ", "Market Name": "Sattupalli", "Variety": "Hybrid"},
  {"Commodity": "Tomato", "District Name": "Chittor", "Grade": "FAQ", "Market Name": "Madanapalli", "Variety": "Hybrid"},
  {"Commodity": "wheat", "District Name": "Barabanki", "Grade": "FAQ", "Market Name": "Barabanki", "Variety": "Hybrid"}
];

// Map Event Handler Component
function MapEventHandler({ onPositionChange }) {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    }
  });
  return null;
}

// Draggable Marker Component
function DraggableMarker({ position, onPositionChange }) {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        onPositionChange(marker.getLatLng());
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default function CropRecommendation() {
  const [position, setPosition] = useState({ lat: 20.5937, lng: 78.9629 });
  const [latitude, setLatitude] = useState(20.5937);
  const [longitude, setLongitude] = useState(78.9629);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const [predictOnlyEnabled, setPredictOnlyEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [achievement, setAchievement] = useState('');
  const searchTimeout = useRef(null);

  useEffect(() => {
    autoDetectLocation();
  }, []);

  const autoDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const newPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setPosition(newPos);
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        showAchievement('📍 Location Detected Successfully!');
      });
    }
  };

  const handlePositionChange = (latlng) => {
    setPosition(latlng);
    setLatitude(parseFloat(latlng.lat.toFixed(4)));
    setLongitude(parseFloat(latlng.lng.toFixed(4)));
    setPredictOnlyEnabled(false);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (query.length < 2) {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }

    searchTimeout.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const selectSuggestion = (item) => {
    const newPos = {
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon)
    };
    setPosition(newPos);
    setLatitude(newPos.lat);
    setLongitude(newPos.lng);
    setSearchQuery(item.display_name);
    setShowSuggestions(false);
    setPredictOnlyEnabled(false);
  };

  const autoGetGrowingSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 10) return "Kharif";
    if (month >= 11 || month <= 4) return "Rabi";
    return "Zaid";
  };

  const getDistrictAndState = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10&addressdetails=1`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'AgroPredictApp/1.0'
        }
      });
      
      const data = await response.json();

      if (data && data.address) {
        const address = data.address;
        const state = address.state || address.province || 'Unknown State';
        const district = address.county || address.city || address.town || address.village || 'Unknown District';
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return { district, state };
      }
    } catch (error) {
      console.error('Geocoding Error:', error);
    }
    
    return { district: 'Unknown', state: 'Unknown' };
  };

  const constructPredictionPrompt = (data) => {
    const inputData = {
      location: {
        district: data.district,
        state: data.state
      },
      soil_nutrients: {
        nitrogen: parseFloat(data.nitrogen),
        phosphorus: parseFloat(data.phosphorus),
        potassium: parseFloat(data.potassium),
        ph: parseFloat(data.ph),
        organic_carbon: parseFloat(data.organic_carbon),
        moisture: parseFloat(data.moisture),
      },
      weather_conditions: {
        temperature: parseFloat(data.temperature),
        rainfall: parseFloat(data.rainfall),
        humidity: parseFloat(data.humidity),
        sunlight: parseFloat(data.sunlight),
        growing_season: data.growing_season
      }
    };
    
    const jsonInput = JSON.stringify(inputData, null, 2);

    return `
Analyze the following agricultural and location data for India.
Based on the combined soil, weather, and specific location (District/State) context, recommend 3 to 4 most optimal crops to grow.

Your response MUST ONLY be a single JSON array of objects.
Each object in the array must strictly follow this structure:

1. "crop_name" (string): The name of the recommended crop.
2. "priority" (number, 1=Highest): A priority score from 1 to 5, where 1 is the most optimal crop.
3. "reason" (string, max 5 words): A concise reason why this crop is suitable (e.g., "High NPK tolerance", "Perfect monsoon crop").
4. "maturity_days" (number): The typical maturity period in days.

Rules:
- If the location is **Madanapalle**, the top priority must be **Tomato**.
- If the location is **Guntur**, the top priority must be **Chili Red**.
- For any other location, prioritize crops that are **traditionally or regionally famous** in that district/state.
- Only replace "wheat" with "paddy" **if wheat is the top recommendation and the region supports wetland or paddy cultivation.**
- Do NOT always include "paddy" unless the region's soil and climate support it.
- the crops must be in this list :[
  "Bajra(Pearl Millet/Cumbu)",
  "Barley (Jau)",
  "Black Gram (Urd Beans)(Whole)",
  "Chili Red",
  "Copra",
  "Gram Raw(Chholia)",
  "Green Gram (Moong)(Whole)",
  "Groundnut",
  "Jowar(Sorghum)",
  "Lentil (Masur)(Whole)",
  "Maize",
  "Mustard",
  "Niger Seed (Ramtil)",
  "Onion",
  "Paddy(Dhan)(Common)",
  "Pegeon Pea (Arhar Fali)",
  "Potato",
  "Ragi (Finger Millet)",
  "Safflower",
  "Sesamum(Sesame,Gingelly,Til)",
  "Soyabean",
  "Sugarcane",
  "Sunflower",
  "Tomato"
]

Do NOT include any other text, explanation, or markdown formatting outside of the JSON array.

Data: ${jsonInput}
`;
  };

  const findCropRecord = (commodity, district) => {
    const exact = cropData.find(item =>
      String(item.Commodity || '').trim().toLowerCase() === String(commodity).trim().toLowerCase()
      && String(item["District Name"] || '').trim().toLowerCase() === String(district).trim().toLowerCase()
    );
    if (exact) return exact;

    const byCommodity = cropData.find(item =>
      String(item.Commodity || '').trim().toLowerCase() === String(commodity).trim().toLowerCase()
    );
    if (byCommodity) return byCommodity;

    return null;
  };

  const predictCropPrice = async (cropName, district, maturityDays) => {
    try {
      const today = new Date();
      const maturityDate = new Date(today);
      maturityDate.setDate(today.getDate() + maturityDays);

      let cropDetails = findCropRecord(cropName, district);
      
      if (!cropDetails) {
        cropDetails = cropData.find(item => 
          (item.Commodity || '').trim().toLowerCase() === (cropName || '').trim().toLowerCase()
        );
      }

      if (!cropDetails) {
        throw new Error(`No crop details found for ${cropName}`);
      }

      const input = {
        "District Name": cropDetails["District Name"] || '',
        "Market Name": cropDetails["Market Name"] || cropDetails["District Name"] || '',
        "Commodity": cropDetails.Commodity || '',
        "Variety": cropDetails["Variety"] || "General",
        "Grade": cropDetails["Grade"] || "FAQ",
        "day": maturityDate.getDate(),
        "month": maturityDate.getMonth() + 1,
        "year": maturityDate.getFullYear()
      };

      const response = await fetch('https://ecokisan-ml.onrender.com/predict_prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const prediction = await response.json();

      return {
        crop: cropName,
        district: cropDetails["District Name"],
        market: cropDetails["Market Name"],
        minPrice: prediction["Min Price"] ?? prediction.minPrice ?? null,
        maxPrice: prediction["Max Price"] ?? prediction.maxPrice ?? null,
        modalPrice: prediction["Modal Price"] ?? prediction.modalPrice ?? null,
        maturityDate: maturityDate.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };
    } catch (error) {
      console.error(`Price prediction error for ${cropName}:`, error);
      return null;
    }
  };

  const calculateProfitLoss = (breakEvenPrice, modalPrice) => {
    const profit = modalPrice - breakEvenPrice;
    const profitPercentage = ((profit / breakEvenPrice) * 100).toFixed(1);
    return {
      profit,
      profitPercentage,
      isProfit: profit > 0
    };
  };

  const updateStep = (index, status) => {
    setCurrentStep(index);
    setLoadingSteps(prev => prev.map((step, i) => ({
      ...step,
      status: i === index ? status : i < index ? 'completed' : 'pending'
    })));
  };

  const showAchievement = (message) => {
    setAchievement(message);
    setTimeout(() => setAchievement(''), 3000);
  };

  const fetchAndPredict = async () => {
    setResults(null);
    setError(null);
    setPredictOnlyEnabled(false);
    
    const steps = [
      { icon: '📍', text: 'Getting Location Name (District/State)...', status: 'pending' },
      { icon: '🌱', text: 'Fetching Soil Properties...', status: 'pending' },
      { icon: '🌤️', text: 'Retrieving Weather Information...', status: 'pending' },
      { icon: '📊', text: 'Processing & Preparing Prompt...', status: 'pending' },
      { icon: '🤖', text: 'Connecting to AI INFINITY ML MODELS...', status: 'pending' },
      { icon: '🧠', text: 'Analyzing & Generating Prediction...', status: 'pending' },
      { icon: '🌾', text: 'Displaying Optimal Crops...', status: 'pending' },
      { icon: '💰', text: 'Fetching Price Predictions...', status: 'pending' },
      { icon: '📈', text: 'Finalizing Results...', status: 'pending' }
    ];

    setLoadingSteps(steps);
    setLoading(true);
    
    try {
      updateStep(0, 'active');
      const location = await getDistrictAndState(latitude, longitude);
      const newFetchedData = { district: location.district, state: location.state };
      updateStep(0, 'completed');

      updateStep(1, 'active');
      const soilRes = await fetch(
        `https://rest-sisindia.isric.org/sisindia/v1.0/properties/query/gridded?lon=${longitude}&lat=${latitude}`
      );

      let soilJson;
      try {
        soilJson = await soilRes.json();
      } catch (jsonErr) {
        throw new Error('Current Location is not an Agricultural  Land.');
      }

      if (!soilJson.features || !soilJson.features[0] || !soilJson.features[0].properties || !soilJson.features[0].properties.soil_properties) {
        throw new Error('No soil data found for this location.');
      }

      const soil = soilJson.features[0].properties.soil_properties;
      const values = [soil.N, soil.P, soil.K, soil.OC, soil.pH];
      if (values.some(v => v === null || v === undefined || isNaN(v))) {
        throw new Error('Incomplete soil data (N, P, K, pH, OC missing).');
      }

      updateStep(1, 'completed');

      updateStep(2, 'active');
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,sunshine_duration`
      );
      const weatherJson = await weatherRes.json();
      const current = weatherJson.current || {};
      updateStep(2, 'completed');

      updateStep(3, 'active');
      const completeData = {
        ...newFetchedData,
        nitrogen: (soil.N / 10).toFixed(2),
        phosphorus: soil.P.toFixed(2),
        potassium: soil.K.toFixed(2),
        organic_carbon: soil.OC.toFixed(2),
        ph: soil.pH.toFixed(2),
        temperature: current.temperature_2m || 25,
        humidity: current.relative_humidity_2m || 75,
        rainfall: (current.rain || current.precipitation || 100).toFixed(1),
        sunlight: (current.sunshine_duration ? current.sunshine_duration / 3600 : 7.5).toFixed(1),
        moisture: 60,
        growing_season: autoGetGrowingSeason()
      };
      setFetchedData(completeData);
      updateStep(3, 'completed');
      
      await new Promise(resolve => setTimeout(resolve, 300));

      updateStep(4, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(4, 'completed');

      updateStep(5, 'active');
      const predictionPrompt = constructPredictionPrompt(completeData);
      const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

      const response = await fetch("https://ecokisan-disease.onrender.com/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: predictionPrompt, 
          model: 'openai/gpt-oss-20b', 
          lang: selectedLanguage 
        }),
      });
      
      const chatResult = await response.json();

      if (!chatResult.response) {
        throw new Error(chatResult.error || "AI Chat API did not return a valid response.");
      }

      updateStep(5, 'completed');

      updateStep(6, 'active');
      
      let predictionResults;
      try {
        predictionResults = JSON.parse(chatResult.response.trim());
        if (!Array.isArray(predictionResults)) {
          throw new Error('AI did not return a JSON array as requested.');
        }
      } catch (e) {
        throw new Error(`AI Prediction failed to return clean JSON array.`);
      }
      
      predictionResults.sort((a, b) => (a.priority || 5) - (b.priority || 5)); 

      updateStep(6, 'completed');
      
      updateStep(7, 'active');
      setLoading(false);

      if (predictionResults.length > 0) {
        // Fetch prices for all crops
        const cropsWithPrices = [];
        for (let crop of predictionResults) {
          const priceData = await predictCropPrice(
            crop.crop_name, 
            completeData.district, 
            crop.maturity_days
          );

          if (priceData) {
            const breakEven = breakEvenPrices[crop.crop_name] || 0;
            const profitAnalysis = calculateProfitLoss(breakEven, priceData.modalPrice);
            
            cropsWithPrices.push({
              ...crop,
              priceData,
              breakEven,
              profitAnalysis
            });
          } else {
            cropsWithPrices.push({
              ...crop,
              priceData: null
            });
          }

          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Sort by profit
        cropsWithPrices.sort((a, b) => {
          if (!a.profitAnalysis || !b.profitAnalysis) return 0;
          return b.profitAnalysis.profit - a.profitAnalysis.profit;
        });

        setResults(cropsWithPrices);
        setPredictOnlyEnabled(true);
        showAchievement('🏆 Complete Success! Top Crops with Price Analysis Ready!');
      } else {
        throw new Error('Prediction failed: AI returned an empty list.');
      }
    } catch (err) {
      setLoading(false);
      let message = err.message;
      if (message.includes('Incomplete soil data') || message.includes('No soil data')) {
        message = 'The selected location is not on agricultural land or data is incomplete.';
      }
      setError(message);
    }
  };

  const predictFromAuto = async () => {
    if (!fetchedData.nitrogen) {
      alert('Please fetch location data first!');
      return;
    }
    
    setResults(null);
    setError(null);
    const steps = [
      { icon: '🤖', text: 'Connecting to AI Chat API...', status: 'pending' },
      { icon: '🧠', text: 'Analyzing & Generating Prediction...', status: 'pending' },
      { icon: '🌾', text: 'Displaying Optimal Crops...', status: 'pending' },
      { icon: '💰', text: 'Fetching Price Predictions...', status: 'pending' },
      { icon: '📈', text: 'Finalizing Results...', status: 'pending' }
    ];

    setLoadingSteps(steps);
    setLoading(true);

    try {
      updateStep(0, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(0, 'completed');

      updateStep(1, 'active');
      const predictionPrompt = constructPredictionPrompt(fetchedData);
      const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

      const response = await fetch("https://ecokisan-disease.onrender.com/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: predictionPrompt, 
          model: 'openai/gpt-oss-20b', 
          lang: selectedLanguage 
        }),
      });
      
      const chatResult = await response.json();
      if (!chatResult.response) {
        throw new Error(chatResult.error || "AI Chat API did not return a valid response.");
      }

      updateStep(1, 'completed');

      updateStep(2, 'active');
      
      let predictionResults;
      try {
        predictionResults = JSON.parse(chatResult.response.trim());
        if (!Array.isArray(predictionResults)) {
          throw new Error('AI did not return a JSON array as requested.');
        }
      } catch (e) {
        throw new Error(`AI Prediction failed to return clean JSON array.`);
      }
      
      predictionResults.sort((a, b) => (a.priority || 5) - (b.priority || 5)); 

      updateStep(2, 'completed');
      
      updateStep(3, 'active');
      setLoading(false);

      if (predictionResults.length > 0) {
        const cropsWithPrices = [];
        for (let crop of predictionResults) {
          const priceData = await predictCropPrice(
            crop.crop_name, 
            fetchedData.district, 
            crop.maturity_days
          );

          if (priceData) {
            const breakEven = breakEvenPrices[crop.crop_name] || 0;
            const profitAnalysis = calculateProfitLoss(breakEven, priceData.modalPrice);
            
            cropsWithPrices.push({
              ...crop,
              priceData,
              breakEven,
              profitAnalysis
            });
          } else {
            cropsWithPrices.push({
              ...crop,
              priceData: null
            });
          }

          await new Promise(resolve => setTimeout(resolve, 500));
        }

        cropsWithPrices.sort((a, b) => {
          if (!a.profitAnalysis || !b.profitAnalysis) return 0;
          return b.profitAnalysis.profit - a.profitAnalysis.profit;
        });

        setResults(cropsWithPrices);
        showAchievement('🏆 Prediction Complete with Price Analysis!');
      } else {
        throw new Error('Prediction failed: AI returned an empty list.');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message.includes('fetch') ? 'Could not connect to the AI chat API or network issue.' : err.message);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>
            <span>🤖</span>AI Crop Recommendation
          </h1>
          <p style={styles.subtitle}>AI-Powered Agricultural Intelligence System with Price Analysis</p>
        </div>

        <div style={styles.mapSection}>
          <div style={styles.searchContainer}>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="🔍 Search for a location..."
              value={searchQuery}
              onChange={handleSearchInput}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div style={styles.suggestions}>
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    style={styles.suggestionItem}
                    onClick={() => selectSuggestion(item)}
                  >
                    {item.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ height: '400px', width: '100%', borderRadius: '15px', marginBottom: '20px', overflow: 'hidden' }}>
            <MapContainer
              center={[position.lat, position.lng]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapEventHandler onPositionChange={handlePositionChange} />
              <DraggableMarker position={position} onPositionChange={handlePositionChange} />
            </MapContainer>
          </div>
        </div>

        <div style={styles.controls}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Latitude</label>
            <input
              style={styles.input}
              type="number"
              value={latitude}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                setLatitude(val);
                setPosition({ lat: val, lng: longitude });
                setPredictOnlyEnabled(false);
              }}
              step="0.0001"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Longitude</label>
            <input
              style={styles.input}
              type="number"
              value={longitude}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                setLongitude(val);
                setPosition({ lat: latitude, lng: val });
                setPredictOnlyEnabled(false);
              }}
              step="0.0001"
            />
          </div>
          <button
            style={styles.btnPrimary}
            onClick={fetchAndPredict}
          >
            🌍 Fetch & Predict
          </button>
          <button
            style={predictOnlyEnabled ? styles.btnSecondary : styles.btnDisabled}
            onClick={predictFromAuto}
            disabled={!predictOnlyEnabled}
          >
            🌿 Predict Only
          </button>
        </div>

        <div style={styles.dataSection}>
          {!fetchedData.nitrogen ? (
            <p style={styles.initialMessage}>
              📍 Select a location on the map or search, then click 'Fetch & Predict' to start.
            </p>
          ) : (
            <div style={styles.dataCards}>
              <div style={{...styles.dataCard, ...styles.locationCard}}>
                <div style={styles.cardIcon}>🗺️</div>
                <div style={styles.cardTitle}>Location</div>
                <div style={styles.cardValue}>{fetchedData.district}, {fetchedData.state}</div>
              </div>
              <div style={styles.dataCard}>
                <div style={styles.cardIcon}>🌱</div>
                <div style={styles.cardTitle}>Soil Health (N-P-K)</div>
                <div style={styles.cardValue}>N: {fetchedData.nitrogen}</div>
                <div style={{...styles.cardTitle, marginTop: '10px'}}>P: {fetchedData.phosphorus} | K: {fetchedData.potassium}</div>
              </div>
              <div style={styles.dataCard}>
                <div style={styles.cardIcon}>🧪</div>
                <div style={styles.cardTitle}>pH Level</div>
                <div style={styles.cardValue}>{fetchedData.ph}</div>
              </div>
              <div style={styles.dataCard}>
                <div style={styles.cardIcon}>🌡️</div>
                <div style={styles.cardTitle}>Temperature</div>
                <div style={styles.cardValue}>{fetchedData.temperature}°C</div>
              </div>
              <div style={styles.dataCard}>
                <div style={styles.cardIcon}>💧</div>
                <div style={styles.cardTitle}>Humidity</div>
                <div style={styles.cardValue}>{fetchedData.humidity}%</div>
              </div>
              <div style={styles.dataCard}>
                <div style={styles.cardIcon}>🌧️</div>
                <div style={styles.cardTitle}>Rainfall</div>
                <div style={styles.cardValue}>{fetchedData.rainfall}mm</div>
              </div>
              <div style={styles.dataCard}>
                <div style={styles.cardIcon}>📅</div>
                <div style={styles.cardTitle}>Growing Season</div>
                <div style={styles.cardValue}>{fetchedData.growing_season}</div>
              </div>
            </div>
          )}

          <div style={styles.sectionHeader}>🎯 Prediction Results</div>
          
          {error && (
            <div style={styles.errorSection}>
              <div style={styles.errorTitle}>⚠️ Error</div>
              <p>{error}</p>
            </div>
          )}

          {results && results.length > 0 && (
            <div style={styles.resultSection}>
              <div style={styles.resultTitle}>
                <span>🎯</span>
                <span>Top {results.length} Best suited Crops for the Soil and Weather conditions</span>
              </div>
              <div style={styles.resultGrid}>
                {results.map((crop, rank) => {
                  const profitRank = crop.profitAnalysis && crop.profitAnalysis.isProfit ? rank + 1 : null;
                  
                  return (
                    <div key={rank} style={styles.resultItem}>
                      {profitRank && profitRank <= 3 && (
                        <div style={styles.profitRankBadge}>
                          {profitRank === 1 ? '🥇' : profitRank === 2 ? '🥈' : '🥉'}
                        </div>
                      )}
                      <div style={styles.resultLabel}>
                        {profitRank ? `Most Profitable #${profitRank}` : 'Suits for your Soil'}
                      </div>
                      <div style={styles.resultValue}>{crop.crop_name}</div>
                      <div style={styles.resultReason}>
                        <span style={styles.reasonIcon}>Why:</span> {crop.reason}
                      </div>
                      <div style={styles.resultMaturity}>
                        <span style={styles.reasonIcon}>Matures:</span> {crop.maturity_days} days
                      </div>
                      
                      {crop.priceData ? (
                        <div style={styles.priceSection}>
                          <div style={styles.priceHeader}>
                            💰 Expected Price on {crop.priceData.maturityDate}
                          </div>
                          <div style={styles.priceGrid}>
                            <div style={styles.priceItem}>
                              <div style={styles.priceLabel}>Min</div>
                              <div style={styles.priceValue}>₹{crop.priceData.minPrice}</div>
                            </div>
                            <div style={styles.priceItem}>
                              <div style={styles.priceLabel}>Modal</div>
                              <div style={styles.priceValue}>₹{crop.priceData.modalPrice}</div>
                            </div>
                            <div style={styles.priceItem}>
                              <div style={styles.priceLabel}>Max</div>
                              <div style={styles.priceValue}>₹{crop.priceData.maxPrice}</div>
                            </div>
                          </div>

                          <div style={crop.profitAnalysis.isProfit ? styles.profitSectionProfit : styles.profitSectionLoss}>
                            {crop.profitAnalysis.isProfit 
                              ? `📈 Expected Profit: ₹${Math.abs(crop.profitAnalysis.profit).toFixed(0)}`
                              : `📉 Potential Loss: ₹${Math.abs(crop.profitAnalysis.profit).toFixed(0)}`
                            }
                            <span style={crop.profitAnalysis.isProfit ? styles.profitBadgeProfit : styles.profitBadgeLoss}>
                              {crop.profitAnalysis.profitPercentage > 0 ? '+' : ''}{crop.profitAnalysis.profitPercentage}%
                            </span>
                          </div>

                          {!crop.profitAnalysis.isProfit && (
                            <div style={styles.soilNote}>
                              🌱 This crop suits your soil conditions, but you may face a loss at maturity due to market price trends.
                            </div>
                          )}

                          <div style={styles.maturityDate}>
                            🌾 Break-even: ₹{crop.breakEven} per quintal
                          </div>
                        </div>
                      ) : (
                        <div style={styles.loadingPrice}>⚠️ Price data unavailable</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.loadingSpinner}></div>
            <div style={styles.loadingText}>
              {loadingSteps[currentStep]?.text || 'Processing Request...'}
            </div>
            <div style={styles.loadingSubtext}>Please wait while we analyze the data</div>
            <div style={styles.progressSteps}>
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.progressStep,
                    ...(step.status === 'active' ? styles.progressStepActive : {}),
                    ...(step.status === 'completed' ? styles.progressStepCompleted : {})
                  }}
                >
                  <span style={styles.stepIcon}>{step.icon}</span>
                  <span style={styles.stepText}>{step.text}</span>
                  <span style={styles.stepStatus}>
                    {step.status === 'completed' ? '✅' : '⏳'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {achievement && (
        <div style={styles.achievementToast}>
          {achievement}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: '20px',
    margin: 0
  },
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    animation: 'slideIn 0.6s ease-out'
  },
  header: {
    background: 'linear-gradient(135deg, #2b7a0b 0%, #1f5408 100%)',
    color: 'white',
    padding: '30px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  h1: {
    fontSize: '2.5em',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    margin: 0
  },
  subtitle: {
    fontSize: '1.1em',
    opacity: 0.9,
    margin: 0
  },
  mapSection: {
    padding: '30px',
    background: '#f8f9fa',
    borderBottom: '2px solid #e0e0e0'
  },
  searchContainer: {
    marginBottom: '20px',
    position: 'relative'
  },
  searchInput: {
    width: '100%',
    padding: '15px 20px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.3s',
    boxSizing: 'border-box'
  },
  suggestions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    border: '2px solid #ddd',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  suggestionItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  controls: {
    padding: '30px',
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  inputGroup: {
    flex: 1,
    minWidth: '200px'
  },
  label: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '8px',
    fontSize: '0.95em',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'all 0.3s'
  },
  btnPrimary: {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    background: 'linear-gradient(135deg, #2b7a0b 0%, #1f5408 100%)',
    color: 'white'
  },
  btnSecondary: {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    color: 'white'
  },
  btnDisabled: {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'not-allowed',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    background: '#cbd5e0',
    color: 'white'
  },
  dataSection: {
    padding: '30px'
  },
  initialMessage: {
    textAlign: 'center',
    color: '#718096',
    marginTop: '20px',
    fontSize: '1.1em'
  },
  dataCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    margin: '20px 0'
  },
  dataCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    transform: 'translateY(0)',
    transition: 'all 0.3s ease',
    animation: 'cardSlideIn 0.5s ease-out backwards'
  },
  locationCard: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  cardIcon: {
    fontSize: '2.5em',
    marginBottom: '10px'
  },
  cardTitle: {
    fontSize: '0.9em',
    opacity: 0.9,
    marginBottom: '5px'
  },
  cardValue: {
    fontSize: '1.8em',
    fontWeight: 'bold'
  },
  sectionHeader: {
    fontSize: '1.5em',
    color: '#2b7a0b',
    margin: '30px 0 20px 0',
    paddingBottom: '10px',
    borderBottom: '3px solid #2b7a0b',
    fontWeight: 700
  },
  resultSection: {
    marginTop: '30px',
    padding: '30px',
    background: 'linear-gradient(135deg, #eaf8ea 0%, #d4f1d4 100%)',
    borderRadius: '15px',
    borderLeft: '5px solid #2b7a0b'
  },
  resultTitle: {
    fontSize: '2em',
    color: '#2b7a0b',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontWeight: 700
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  resultItem: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  resultLabel: {
    fontSize: '1em',
    color: '#666',
    marginBottom: '12px',
    fontWeight: 500
  },
  resultValue: {
    fontSize: '2.2em',
    fontWeight: 800,
    color: '#2b7a0b',
    marginBottom: '15px',
    lineHeight: 1.2
  },
  resultReason: {
    fontSize: '0.95em',
    color: '#555',
    margin: '8px 0',
    padding: '8px 12px',
    background: '#f8f9fa',
    borderRadius: '6px'
  },
  resultMaturity: {
    fontSize: '0.95em',
    color: '#555',
    margin: '8px 0',
    padding: '8px 12px',
    background: '#f8f9fa',
    borderRadius: '6px'
  },
  reasonIcon: {
    fontWeight: 700,
    color: '#2b7a0b',
    marginRight: '5px'
  },
  priceSection: {
    marginTop: '15px',
    padding: '15px',
    background: 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%)',
    borderRadius: '10px',
    borderLeft: '4px solid #ff9800'
  },
  priceHeader: {
    fontWeight: 700,
    color: '#f57c00',
    marginBottom: '10px',
    fontSize: '1.05em'
  },
  priceGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    margin: '10px 0'
  },
  priceItem: {
    background: 'white',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  priceLabel: {
    fontSize: '0.8em',
    color: '#666',
    marginBottom: '5px'
  },
  priceValue: {
    fontSize: '1.3em',
    fontWeight: 800,
    color: '#ff9800'
  },
  profitSectionProfit: {
    marginTop: '12px',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '1.1em',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #d4f1d4 0%, #a8e6a3 100%)',
    color: '#2b7a0b',
    border: '2px solid #2b7a0b'
  },
  profitSectionLoss: {
    marginTop: '12px',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '1.1em',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ffd4d4 0%, #ffb3b3 100%)',
    color: '#c62828',
    border: '2px solid #c62828'
  },
  profitBadgeProfit: {
    display: 'inline-block',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '0.9em',
    marginLeft: '10px',
    fontWeight: 800,
    background: '#2b7a0b',
    color: 'white'
  },
  profitBadgeLoss: {
    display: 'inline-block',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '0.9em',
    marginLeft: '10px',
    fontWeight: 800,
    background: '#c62828',
    color: 'white'
  },
  soilNote: {
    marginTop: '8px',
    padding: '6px 10px',
    backgroundColor: '#fff8e1',
    borderLeft: '4px solid #fbc02d',
    color: '#5d4037',
    fontSize: '0.9em',
    borderRadius: '4px'
  },
  maturityDate: {
    fontSize: '0.9em',
    color: '#666',
    marginTop: '8px',
    padding: '8px',
    background: 'white',
    borderRadius: '6px',
    fontWeight: 600
  },
  profitRankBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    color: '#333',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5em',
    fontWeight: 900,
    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.6)',
    border: '3px solid white'
  },
  loadingPrice: {
    fontSize: '0.9em',
    color: '#c62828',
    fontStyle: 'italic',
    padding: '10px',
    background: '#f0f0f0',
    borderRadius: '6px',
    marginTop: '10px'
  },
  errorSection: {
    marginTop: '30px',
    padding: '30px',
    background: 'linear-gradient(135deg, #ffecec 0%, #ffd4d4 100%)',
    borderRadius: '15px',
    borderLeft: '5px solid #e53e3e',
    textAlign: 'center'
  },
  errorTitle: {
    fontSize: '1.5em',
    color: '#e53e3e',
    marginBottom: '15px',
    fontWeight: 700
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingContent: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    textAlign: 'center',
    minWidth: '400px'
  },
  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #2b7a0b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  loadingText: {
    fontSize: '1.3em',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  loadingSubtext: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '20px'
  },
  progressSteps: {
    marginTop: '20px',
    textAlign: 'left'
  },
  progressStep: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    background: '#f8f9fa',
    opacity: 0.5,
    transition: 'all 0.3s'
  },
  progressStepActive: {
    opacity: 1,
    background: '#eaf8ea',
    borderLeft: '4px solid #2b7a0b',
    fontWeight: 'bold'
  },
  progressStepCompleted: {
    opacity: 1,
    background: '#d4f1d4'
  },
  stepIcon: {
    fontSize: '1.5em',
    marginRight: '15px',
    minWidth: '30px',
    textAlign: 'center'
  },
  stepText: {
    flex: 1
  },
  stepStatus: {
    fontSize: '1.2em'
  },
  achievementToast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    color: '#333',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    animation: 'slideInRight 0.5s ease-out',
    zIndex: 10000,
    fontWeight: 600,
    fontSize: '1.1em'
  }
};