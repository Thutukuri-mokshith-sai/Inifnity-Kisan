import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // =========================================
  //         CONFIGURATION & STATE
  // =========================================
  const DEFAULT_LAT = 13.560578;
  const DEFAULT_LON = 78.653021;
  const DEFAULT_LOCATION_NAME = 'Muthirevula Farm';
  const DEFAULT_EMAIL = 'bhavyasingam599@gmail.com';
  const DEFAULT_PHONE = '919398710949';
  const NOTIFICATION_API_URL = 'http://localhost:5000/api/notifications/sendmailandsmsnotification';

  const [activeTab, setActiveTab] = useState('weather');
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [previousSoilData, setPreviousSoilData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [sentNotifications, setSentNotifications] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  // =========================================
  //         OPTIMAL RANGES
  // =========================================
  const optimalRanges = {
    temperature: { min: 25, max: 35, unit: '°C' },
    humidity: { min: 50, max: 80, unit: '%' },
    pH: { min: 6.0, max: 7.5, unit: '' },
    nitrogen: { min: 280, max: 450, unit: 'kg/ha' },
    phosphorus: { min: 50, max: 80, unit: 'kg/ha' },
    potassium: { min: 120, max: 200, unit: 'kg/ha' },
    organic_carbon: { min: 0.75, max: 1.5, unit: '%' },
    moisture: { min: 25, max: 35, unit: '%' },
    boron: { min: 0.5, max: 2.0, unit: 'mg/kg' },
    copper: { min: 0.5, max: 2.0, unit: 'mg/kg' },
    iron: { min: 2.0, max: 10.0, unit: 'mg/kg' },
    manganese: { min: 1.0, max: 5.0, unit: 'mg/kg' },
    sulfur: { min: 10, max: 30, unit: 'mg/kg' },
    zinc: { min: 0.5, max: 2.0, unit: 'mg/kg' },
    conductivity: { min: 0.1, max: 0.8, unit: 'dS/m' }
  };

  const propertyDetails = {
    B: { name: 'Boron', icon: 'fa-seedling' },
    Cu: { name: 'Copper', icon: 'fa-flask' },
    EC: { name: 'Conductivity', icon: 'fa-bolt' },
    Fe: { name: 'Iron', icon: 'fa-hammer' },
    K: { name: 'Potassium', icon: 'fa-vial' },
    Mn: { name: 'Manganese', icon: 'fa-atom' },
    N: { name: 'Nitrogen', icon: 'fa-leaf' },
    OC: { name: 'Organic Carbon', icon: 'fa-seedling' },
    P: { name: 'Phosphorus', icon: 'fa-circle' },
    pH: { name: 'pH Level', icon: 'fa-tint' },
    S: { name: 'Sulfur', icon: 'fa-fire' },
    Zn: { name: 'Zinc', icon: 'fa-square' },
  };

  // =========================================
  //         NOTIFICATION API INTEGRATION
  // =========================================
  const sendNotificationAPI = async (notification) => {
    try {
      // Create a unique identifier for this notification to avoid duplicates
      const notificationId = `${notification.type}-${notification.parameter}-${notification.currentValue}`;
      
      // Check if we've already sent this notification
      if (sentNotifications.has(notificationId)) {
        return;
      }

      // Create HTML email message with inline styles
      const emailMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
              <div style="font-size: 24px; font-weight: bold; color: #2d3748; margin-bottom: 10px;">
                🌱 Infinity Kisan Alert
              </div>
              <div style="font-size: 14px; color: #718096;">Smart Farming Notification</div>
            </div>
            
            <div style="background: ${getNotificationColor(notification.type)}; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
              <i class="fas ${notification.icon}" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
              <div style="font-size: 18px; font-weight: bold;">${notification.title}</div>
            </div>
            
            <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <div style="font-size: 16px; color: #4a5568; line-height: 1.6; margin-bottom: 15px;">
                ${notification.message}
              </div>
              <div style="display: flex; justify-content: space-between; background: white; padding: 15px; border-radius: 6px; border-left: 4px solid ${getNotificationColor(notification.type)};">
                <div style="font-weight: bold; color: #2d3748;">Current Value:</div>
                <div style="color: #e53e3e; font-weight: bold;">${notification.currentValue}${getParameterUnit(notification.parameter)}</div>
              </div>
              ${notification.previousValue ? `
                <div style="display: flex; justify-content: space-between; background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3182ce; margin-top: 10px;">
                  <div style="font-weight: bold; color: #2d3748;">Previous Value:</div>
                  <div style="color: #3182ce; font-weight: bold;">${notification.previousValue}${getParameterUnit(notification.parameter)}</div>
                </div>
                <div style="display: flex; justify-content: space-between; background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #38a169; margin-top: 10px;">
                  <div style="font-weight: bold; color: #2d3748;">Change:</div>
                  <div style="color: #38a169; font-weight: bold;">${notification.change > 0 ? '+' : ''}${notification.change}%</div>
                </div>
              ` : ''}
            </div>
            
            <div style="background: #edf2f7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <div style="font-size: 14px; color: #4a5568; text-align: center;">
                <strong>Location:</strong> ${DEFAULT_LOCATION_NAME}<br/>
                <strong>Time:</strong> ${new Date().toLocaleString()}
              </div>
            </div>
            
            <div style="text-align: center; color: #718096; font-size: 12px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              This is an automated notification from Infinity Kisan Smart Farming System.<br/>
              Please do not reply to this email.
            </div>
          </div>
        </div>
      `;

      // Create plain text message for SMS
      const smsMessage = notification.previousValue 
        ? `🌱 INFINITY KISAN ALERT - ${notification.title} - ${notification.message} - Current: ${notification.currentValue}${getParameterUnit(notification.parameter)} - Previous: ${notification.previousValue}${getParameterUnit(notification.parameter)} - Change: ${notification.change > 0 ? '+' : ''}${notification.change}% - Location: ${DEFAULT_LOCATION_NAME} - Time: ${new Date().toLocaleString()}`
        : `🌱 INFINITY KISAN ALERT - ${notification.title} - ${notification.message} - Location: ${DEFAULT_LOCATION_NAME} - Time: ${new Date().toLocaleString()}`;

      const response = await fetch(NOTIFICATION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: DEFAULT_EMAIL,
          phone: DEFAULT_PHONE,
          message: emailMessage
        }),
      });

      if (response.ok) {
        console.log('✅ Notification sent successfully:', notification.title);
        // Mark this notification as sent
        setSentNotifications(prev => new Set([...prev, notificationId]));
      } else {
        console.error('❌ Failed to send notification:', await response.text());
      }
    } catch (error) {
      console.error('❌ Error sending notification:', error);
    }
  };

  const getNotificationColor = (type) => {
    const colors = {
      danger: '#e53e3e',
      warning: '#dd6b20',
      info: '#3182ce',
      success: '#38a169'
    };
    return colors[type] || '#718096';
  };

  const getParameterUnit = (parameter) => {
    const units = {
      temperature: '°C',
      humidity: '%',
      pH: '',
      nitrogen: 'kg/ha',
      phosphorus: 'kg/ha',
      potassium: 'kg/ha',
      organic_carbon: '%',
      boron: 'mg/kg',
      copper: 'mg/kg',
      iron: 'mg/kg',
      manganese: 'mg/kg',
      sulfur: 'mg/kg',
      zinc: 'mg/kg',
      conductivity: 'dS/m'
    };
    return units[parameter] || '';
  };

  // =========================================
  //         PARTICLE ANIMATION
  // =========================================
  useEffect(() => {
    const particlesArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6
    }));
    setParticles(particlesArray);
  }, []);

  // =========================================
  //         NOTIFICATION SYSTEM
  // =========================================
  const generateNotifications = useCallback((weatherData, soilData) => {
    const notifications = [];
    const now = new Date();

    // Weather-based notifications
    if (weatherData) {
      if (weatherData.temperature_2m > optimalRanges.temperature.max) {
        notifications.push({
          type: 'danger',
          icon: 'fa-temperature-high',
          title: 'High Temperature Alert',
          message: `Temperature is ${Math.round(weatherData.temperature_2m)}°C (above optimal range of ${optimalRanges.temperature.min}-${optimalRanges.temperature.max}°C). Consider increasing irrigation frequency and providing shade for sensitive crops.`,
          timestamp: now,
          actions: ['Dismiss', 'View Details'],
          parameter: 'temperature',
          currentValue: weatherData.temperature_2m
        });
      } else if (weatherData.temperature_2m < optimalRanges.temperature.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-temperature-low',
          title: 'Low Temperature Warning',
          message: `Temperature is ${Math.round(weatherData.temperature_2m)}°C (below optimal range of ${optimalRanges.temperature.min}-${optimalRanges.temperature.max}°C). Consider protective coverings for young plants.`,
          timestamp: now,
          actions: ['Dismiss', 'View Forecast'],
          parameter: 'temperature',
          currentValue: weatherData.temperature_2m
        });
      }

      if (weatherData.relative_humidity_2m < optimalRanges.humidity.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-droplet-slash',
          title: 'Low Humidity Warning',
          message: `Humidity at ${weatherData.relative_humidity_2m}% (below optimal range of ${optimalRanges.humidity.min}-${optimalRanges.humidity.max}%). Monitor plants for signs of water stress and adjust irrigation accordingly.`,
          timestamp: now,
          actions: ['Dismiss', 'Adjust Irrigation'],
          parameter: 'humidity',
          currentValue: weatherData.relative_humidity_2m
        });
      } else if (weatherData.relative_humidity_2m > optimalRanges.humidity.max) {
        notifications.push({
          type: 'warning',
          icon: 'fa-droplet',
          title: 'High Humidity Warning',
          message: `Humidity at ${weatherData.relative_humidity_2m}% (above optimal range of ${optimalRanges.humidity.min}-${optimalRanges.humidity.max}%). Ensure good plant spacing for airflow to prevent fungal diseases.`,
          timestamp: now,
          actions: ['Dismiss', 'View Details'],
          parameter: 'humidity',
          currentValue: weatherData.relative_humidity_2m
        });
      }

      if (weatherData.wind_speed_10m > 30) {
        notifications.push({
          type: 'warning',
          icon: 'fa-wind',
          title: 'Strong Wind Alert',
          message: `Wind speed is ${weatherData.wind_speed_10m} km/h. Secure greenhouse structures and protect young plants.`,
          timestamp: now,
          actions: ['Dismiss', 'View Forecast']
        });
      }

      if (weatherData.uv_index > 7) {
        notifications.push({
          type: 'info',
          icon: 'fa-sun',
          title: 'High UV Index',
          message: `UV Index is ${weatherData.uv_index}. Perfect conditions for crop growth, but ensure adequate soil moisture.`,
          timestamp: now,
          actions: ['Dismiss', 'Check Soil']
        });
      }
    }

    // Soil-based notifications
    if (soilData) {
      // Check for soil parameter fluctuations
      if (previousSoilData) {
        const fluctuationThreshold = 15; // 15% change threshold
        
        Object.keys(soilData).forEach(key => {
          if (typeof soilData[key] === 'number' && typeof previousSoilData[key] === 'number') {
            const currentValue = soilData[key];
            const previousValue = previousSoilData[key];
            const change = ((currentValue - previousValue) / previousValue) * 100;
            
            if (Math.abs(change) >= fluctuationThreshold) {
              const parameterName = propertyDetails[key]?.name || key;
              const isIncrease = change > 0;
              
              notifications.push({
                type: Math.abs(change) > 30 ? 'danger' : 'warning',
                icon: 'fa-chart-line',
                title: `${parameterName} ${isIncrease ? 'Surge' : 'Drop'} Alert`,
                message: `${parameterName} levels ${isIncrease ? 'increased' : 'decreased'} significantly by ${Math.abs(change).toFixed(1)}% from ${previousValue.toFixed(2)} to ${currentValue.toFixed(2)}${getParameterUnit(key)}. ${isIncrease ? 'Monitor for potential toxicity.' : 'Consider supplementation.'}`,
                timestamp: now,
                actions: ['Dismiss', 'View Analysis'],
                parameter: key,
                currentValue: currentValue,
                previousValue: previousValue,
                change: change
              });
            }
          }
        });
      }

      // Standard soil parameter range checks
      if (soilData.N && soilData.N < optimalRanges.nitrogen.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-leaf',
          title: 'Low Nitrogen Levels',
          message: `Soil nitrogen is ${soilData.N.toFixed(1)} kg/ha (below optimal range of ${optimalRanges.nitrogen.min}-${optimalRanges.nitrogen.max} kg/ha). Consider applying nitrogen-rich fertilizer for better crop yield.`,
          timestamp: now,
          actions: ['Dismiss', 'Fertilizer Plan'],
          parameter: 'nitrogen',
          currentValue: soilData.N
        });
      } else if (soilData.N && soilData.N > optimalRanges.nitrogen.max) {
        notifications.push({
          type: 'danger',
          icon: 'fa-leaf',
          title: 'High Nitrogen Levels',
          message: `Soil nitrogen is ${soilData.N.toFixed(1)} kg/ha (above optimal range of ${optimalRanges.nitrogen.min}-${optimalRanges.nitrogen.max} kg/ha). Reduce nitrogen fertilizer application to prevent excessive growth.`,
          timestamp: now,
          actions: ['Dismiss', 'Adjust Fertilizer'],
          parameter: 'nitrogen',
          currentValue: soilData.N
        });
      }

      if (soilData.pH && soilData.pH < optimalRanges.pH.min) {
        notifications.push({
          type: 'danger',
          icon: 'fa-flask',
          title: 'Low pH Detected',
          message: `Soil pH is ${soilData.pH.toFixed(1)} (below optimal range of ${optimalRanges.pH.min}-${optimalRanges.pH.max}). Apply agricultural lime to raise pH for better nutrient availability.`,
          timestamp: now,
          actions: ['Dismiss', 'pH Adjustment'],
          parameter: 'pH',
          currentValue: soilData.pH
        });
      } else if (soilData.pH && soilData.pH > optimalRanges.pH.max) {
        notifications.push({
          type: 'danger',
          icon: 'fa-flask',
          title: 'High pH Detected',
          message: `Soil pH is ${soilData.pH.toFixed(1)} (above optimal range of ${optimalRanges.pH.min}-${optimalRanges.pH.max}). Apply elemental sulfur to lower pH for optimal nutrient availability.`,
          timestamp: now,
          actions: ['Dismiss', 'pH Adjustment'],
          parameter: 'pH',
          currentValue: soilData.pH
        });
      }

      if (soilData.P && soilData.P < optimalRanges.phosphorus.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-circle',
          title: 'Low Phosphorus Levels',
          message: `Soil phosphorus is ${soilData.P.toFixed(1)} kg/ha (below optimal range of ${optimalRanges.phosphorus.min}-${optimalRanges.phosphorus.max} kg/ha). Consider applying phosphorus-rich fertilizer.`,
          timestamp: now,
          actions: ['Dismiss', 'Fertilizer Plan'],
          parameter: 'phosphorus',
          currentValue: soilData.P
        });
      }

      if (soilData.K && soilData.K < optimalRanges.potassium.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-vial',
          title: 'Low Potassium Levels',
          message: `Soil potassium is ${soilData.K.toFixed(1)} kg/ha (below optimal range of ${optimalRanges.potassium.min}-${optimalRanges.potassium.max} kg/ha). Consider applying potassium-rich fertilizer.`,
          timestamp: now,
          actions: ['Dismiss', 'Fertilizer Plan'],
          parameter: 'potassium',
          currentValue: soilData.K
        });
      }

      if (soilData.OC && soilData.OC < optimalRanges.organic_carbon.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-seedling',
          title: 'Low Organic Carbon',
          message: `Soil organic carbon is ${soilData.OC.toFixed(2)}% (below optimal range of ${optimalRanges.organic_carbon.min}-${optimalRanges.organic_carbon.max}%). Add farmyard manure or compost to improve soil fertility.`,
          timestamp: now,
          actions: ['Dismiss', 'Soil Health'],
          parameter: 'organic_carbon',
          currentValue: soilData.OC
        });
      }

      // Micronutrient notifications
      if (soilData.B && soilData.B < optimalRanges.boron.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-seedling',
          title: 'Low Boron Levels',
          message: `Soil boron is ${soilData.B.toFixed(2)} mg/kg (below optimal range of ${optimalRanges.boron.min}-${optimalRanges.boron.max} mg/kg). Boron is essential for cell wall formation and reproductive development.`,
          timestamp: now,
          actions: ['Dismiss', 'Micronutrient Plan'],
          parameter: 'boron',
          currentValue: soilData.B
        });
      }

      if (soilData.Cu && soilData.Cu < optimalRanges.copper.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-flask',
          title: 'Low Copper Levels',
          message: `Soil copper is ${soilData.Cu.toFixed(2)} mg/kg (below optimal range of ${optimalRanges.copper.min}-${optimalRanges.copper.max} mg/kg). Copper is important for photosynthesis and enzyme activation.`,
          timestamp: now,
          actions: ['Dismiss', 'Micronutrient Plan'],
          parameter: 'copper',
          currentValue: soilData.Cu
        });
      }

      if (soilData.Fe && soilData.Fe < optimalRanges.iron.min) {
        notifications.push({
          type: 'warning',
          icon: 'fa-hammer',
          title: 'Low Iron Levels',
          message: `Soil iron is ${soilData.Fe.toFixed(2)} mg/kg (below optimal range of ${optimalRanges.iron.min}-${optimalRanges.iron.max} mg/kg). Iron is crucial for chlorophyll synthesis.`,
          timestamp: now,
          actions: ['Dismiss', 'Micronutrient Plan'],
          parameter: 'iron',
          currentValue: soilData.Fe
        });
      }

      if (soilData.EC && soilData.EC > optimalRanges.conductivity.max) {
        notifications.push({
          type: 'danger',
          icon: 'fa-bolt',
          title: 'High Soil Salinity',
          message: `Soil electrical conductivity is ${soilData.EC.toFixed(2)} dS/m (above optimal range of ${optimalRanges.conductivity.min}-${optimalRanges.conductivity.max} dS/m). High salinity can affect plant growth and water uptake.`,
          timestamp: now,
          actions: ['Dismiss', 'Soil Remediation'],
          parameter: 'conductivity',
          currentValue: soilData.EC
        });
      }
    }

    return notifications;
  }, [optimalRanges, previousSoilData, propertyDetails]);

  // Send notifications via API when new notifications are generated
  useEffect(() => {
    notifications.forEach(notification => {
      sendNotificationAPI(notification);
    });
  }, [notifications]);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000); // minutes
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minute${diff > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  // =========================================
  //         VISUALIZATION SYSTEM
  // =========================================
  const getWeatherIcon = (code) => {
    const codes = {
      0: { icon: 'fa-sun', description: 'Clear sky' },
      1: { icon: 'fa-cloud-sun', description: 'Mainly clear' },
      2: { icon: 'fa-cloud', description: 'Partly cloudy' },
      3: { icon: 'fa-cloud', description: 'Overcast' },
      45: { icon: 'fa-smog', description: 'Foggy' },
      51: { icon: 'fa-cloud-rain', description: 'Light drizzle' },
      61: { icon: 'fa-cloud-rain', description: 'Light rain' },
      63: { icon: 'fa-cloud-showers-heavy', description: 'Moderate rain' },
      65: { icon: 'fa-cloud-showers-heavy', description: 'Heavy rain' },
      71: { icon: 'fa-snowflake', description: 'Light snow' },
      95: { icon: 'fa-bolt', description: 'Thunderstorm' },
    };
    return codes[code] || { icon: 'fa-question', description: 'Unknown' };
  };

  const createGaugeVisualization = (id, title, icon, value, min, max, unit) => {
    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    let status = 'optimal';
    let statusClass = 'status-optimal';
    let fillColor = 'var(--primary-green)';
    
    if (value < min * 0.9 || value > max * 1.1) {
      status = 'danger';
      statusClass = 'status-danger';
      fillColor = 'var(--accent-red)';
    } else if (value < min || value > max) {
      status = 'warning';
      statusClass = 'status-warning';
      fillColor = 'var(--warning-amber)';
    }
    
    const optimalPosition = ((optimalRanges[id]?.min - min) / (max - min)) * 100;
    const optimalWidth = ((optimalRanges[id]?.max - optimalRanges[id]?.min) / (max - min)) * 100;
    
    return (
      <div key={id} className="visualization-card">
        <div className="visualization-header-small">
          <div className="visualization-icon-small"><i className={`fas ${icon}`}></i></div>
          <div className="visualization-title-small">{title}</div>
          <span className={`status-indicator ${statusClass}`}>{status.toUpperCase()}</span>
        </div>
        <div className="visualization-content">
          <div className="gauge-container">
            <div className="gauge">
              <div className="gauge-background">
                <div className="gauge-fill" style={{ width: `${percentage}%`, background: fillColor }}></div>
                <div className="gauge-optimal" style={{ left: `${optimalPosition}%`, width: `${optimalWidth}%` }}></div>
              </div>
              <div className="gauge-labels">
                <span>{min}{unit}</span>
                <span>Optimal Range</span>
                <span>{max}{unit}</span>
              </div>
            </div>
          </div>
          <div className="gauge-value">{value.toFixed(1)}{unit}</div>
        </div>
      </div>
    );
  };

  const renderVisualizations = () => {
    const visualizations = [];
    
    if (weatherData?.current) {
      visualizations.push(
        createGaugeVisualization(
          'temperature',
          'Temperature',
          'fa-thermometer-half',
          weatherData.current.temperature_2m,
          optimalRanges.temperature.min,
          optimalRanges.temperature.max,
          '°C'
        )
      );
      
      visualizations.push(
        createGaugeVisualization(
          'humidity',
          'Humidity',
          'fa-droplet',
          weatherData.current.relative_humidity_2m,
          optimalRanges.humidity.min,
          optimalRanges.humidity.max,
          '%'
        )
      );
    }

    if (soilData) {
      if (soilData.pH) {
        visualizations.push(
          createGaugeVisualization(
            'pH',
            'Soil pH',
            'fa-flask',
            soilData.pH,
            optimalRanges.pH.min,
            optimalRanges.pH.max,
            ''
          )
        );
      }
      
      if (soilData.N) {
        visualizations.push(
          createGaugeVisualization(
            'nitrogen',
            'Nitrogen',
            'fa-leaf',
            soilData.N,
            optimalRanges.nitrogen.min,
            optimalRanges.nitrogen.max,
            'kg/ha'
          )
        );
      }
    }

    return visualizations;
  };

  // =========================================
  //         DATA FETCHING
  // =========================================
  const fetchAllData = async () => {
    setIsLoading(true);
    
    try {
      // Fetch soil data
      const soilUrl = `https://rest-sisindia.isric.org/sisindia/v1.0/properties/query/gridded?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}`;
      const soilResponse = await fetch(soilUrl);
      
      if (soilResponse.ok) {
        const soilData = await soilResponse.json();
        if (soilData.features?.length) {
          const newSoilData = soilData.features[0].properties.soil_properties;
          
          // Store previous soil data before updating
          setPreviousSoilData(soilData);
          setSoilData(newSoilData);
        }
      }

      // Fetch weather data
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_LAT}&longitude=${DEFAULT_LON}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,surface_pressure,uv_index&hourly=temperature_2m,weather_code&forecast_days=1&timezone=auto`;
      const weatherResponse = await fetch(weatherUrl);
      
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);
        
        // Generate notifications with both weather and soil data
        const newNotifications = generateNotifications(weatherData.current, soilData?.features?.[0]?.properties?.soil_properties);
        setNotifications(newNotifications);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================
  //         EFFECTS
  // =========================================
  useEffect(() => {
    fetchAllData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchAllData();
    }, 300000);
    
    return () => clearInterval(interval);
  }, []);

  // =========================================
  //         RENDER COMPONENTS
  // =========================================
  const renderWeatherTab = () => {
    if (!weatherData) {
      return (
        <div id="current-weather">
          <div className="weather-main">
            <div className="weather-icon-large"><i className="fas fa-spinner fa-spin"></i></div>
            <div className="weather-info">
              <div className="location-name">Loading...</div>
              <div className="temperature-display">--°</div>
            </div>
          </div>
        </div>
      );
    }

    const current = weatherData.current;
    const weather = getWeatherIcon(current.weather_code);

    return (
      <>
        <div id="current-weather">
          <div className="weather-main">
            <div className="weather-icon-large"><i className={`fas ${weather.icon}`}></i></div>
            <div className="weather-info">
              <div className="location-name">{DEFAULT_LOCATION_NAME}</div>
              <div className="temperature-display">{Math.round(current.temperature_2m)}°C</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '1.1em', marginTop: '5px' }}>
                {weather.description}
              </div>
            </div>
          </div>
        </div>
        
        <div className="weather-details-grid">
          <div className="weather-detail-item">
            <div className="weather-detail-icon"><i className="fas fa-thermometer-half"></i></div>
            <div>
              <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>Feels Like</div>
              <div style={{ fontWeight: '700' }}>{Math.round(current.apparent_temperature)}°C</div>
            </div>
          </div>
          <div className="weather-detail-item">
            <div className="weather-detail-icon"><i className="fas fa-wind"></i></div>
            <div>
              <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>Wind Speed</div>
              <div style={{ fontWeight: '700' }}>{current.wind_speed_10m} km/h</div>
            </div>
          </div>
          <div className="weather-detail-item">
            <div className="weather-detail-icon"><i className="fas fa-droplet"></i></div>
            <div>
              <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>Humidity</div>
              <div style={{ fontWeight: '700' }}>{current.relative_humidity_2m}%</div>
            </div>
          </div>
          <div className="weather-detail-item">
            <div className="weather-detail-icon"><i className="fas fa-gauge"></i></div>
            <div>
              <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>Pressure</div>
              <div style={{ fontWeight: '700' }}>{current.surface_pressure} hPa</div>
            </div>
          </div>
          <div className="weather-detail-item">
            <div className="weather-detail-icon"><i className="fas fa-sun"></i></div>
            <div>
              <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>UV Index</div>
              <div style={{ fontWeight: '700' }}>{current.uv_index}</div>
            </div>
          </div>
          <div className="weather-detail-item">
            <div className="weather-detail-icon"><i className="fas fa-clock"></i></div>
            <div>
              <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>Local Time</div>
              <div style={{ fontWeight: '700' }}>
                {new Date().toLocaleTimeString('en-US', { 
                  timeZone: weatherData.timezone, 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        </div>
        
        <h3 style={{ margin: '30px 0 15px 0', fontSize: '1.2em', color: 'var(--text-dark)' }}>
          <i className="fas fa-clock"></i> Hourly Forecast
        </h3>
        {renderHourlyForecast()}
      </>
    );
  };

  const renderHourlyForecast = () => {
    if (!weatherData) return null;

    const currentHour = new Date().getHours();
    const today = new Date().toLocaleDateString('en-US', { timeZone: weatherData.timezone });

    const startIndex = weatherData.hourly.time.findIndex(timeStr => {
      const date = new Date(timeStr);
      return date.toLocaleDateString('en-US', { timeZone: weatherData.timezone }) === today && date.getHours() >= currentHour;
    });

    const start = startIndex === -1 ? 0 : startIndex;
    const hourlyCards = [];

    for (let i = start; i < start + 8 && i < weatherData.hourly.time.length; i++) {
      const time = new Date(weatherData.hourly.time[i]);
      const temp = Math.round(weatherData.hourly.temperature_2m[i]);
      const weather = getWeatherIcon(weatherData.hourly.weather_code[i]);

      hourlyCards.push(
        <div key={i} className="hourly-card">
          <div className="hourly-time">{time.getHours()}:00</div>
          <div className="hourly-icon"><i className={`fas ${weather.icon}`}></i></div>
          <div className="hourly-temp">{temp}°C</div>
          <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: '5px' }}>
            {weather.description}
          </div>
        </div>
      );
    }

    return <div className="hourly-container">{hourlyCards}</div>;
  };

  const renderSoilTab = () => {
    if (!soilData) {
      return (
        <div id="soil-data-container" style={{ display: 'none' }}>
          <div className="soil-grid" id="soil-data-grid"></div>
        </div>
      );
    }

    const soilItems = Object.entries(soilData).map(([key, value]) => {
      const details = propertyDetails[key] || { name: key, icon: 'fa-circle' };
      let statusClass = 'soil-status-optimal';
      
      // Determine status based on optimal ranges
      if (key === 'pH' && value) {
        if (value < optimalRanges.pH.min || value > optimalRanges.pH.max) {
          statusClass = value < optimalRanges.pH.min * 0.9 || value > optimalRanges.pH.max * 1.1 ? 
            'soil-status-danger' : 'soil-status-warning';
        }
      } else if (key === 'N' && value) {
        if (value < optimalRanges.nitrogen.min || value > optimalRanges.nitrogen.max) {
          statusClass = value < optimalRanges.nitrogen.min * 0.9 || value > optimalRanges.nitrogen.max * 1.1 ? 
            'soil-status-danger' : 'soil-status-warning';
        }
      } else if (key === 'P' && value) {
        if (value < optimalRanges.phosphorus.min) {
          statusClass = value < optimalRanges.phosphorus.min * 0.9 ? 
            'soil-status-danger' : 'soil-status-warning';
        }
      } else if (key === 'K' && value) {
        if (value < optimalRanges.potassium.min) {
          statusClass = value < optimalRanges.potassium.min * 0.9 ? 
            'soil-status-danger' : 'soil-status-warning';
        }
      } else if (key === 'OC' && value) {
        if (value < optimalRanges.organic_carbon.min) {
          statusClass = value < optimalRanges.organic_carbon.min * 0.9 ? 
            'soil-status-danger' : 'soil-status-warning';
        }
      }
      
      return (
        <div key={key} className="soil-item">
          <div className="soil-icon"><i className={`fas ${details.icon}`}></i></div>
          <div className="soil-label">{details.name}</div>
          <div className="soil-value">{typeof value === 'number' ? value.toFixed(2) : value || 'N/A'}</div>
          <div className={`soil-status ${statusClass}`}></div>
        </div>
      );
    });

    return (
      <div id="soil-data-container" style={{ display: 'block' }}>
        <div className="soil-grid">{soilItems}</div>
      </div>
    );
  };

  const renderNotifications = () => {
    if (notifications.length === 0) return null;

    return (
      <div className="notifications-panel">
        <div className="notifications-header">
          <div className="notifications-title">
            <div className="notifications-icon"><i className="fas fa-bell"></i></div>
            Real-Time Alerts & Recommendations
          </div>
          <div className="notification-count">
            {notifications.length} Alert{notifications.length > 1 ? 's' : ''}
          </div>
        </div>
        <div className="notifications-grid">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`notification-card notification-${notification.type}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="notification-icon">
                <i className={`fas ${notification.icon}`}></i>
              </div>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-timestamp">{formatTimestamp(notification.timestamp)}</div>
                {notification.previousValue && (
                  <div className="notification-change">
                    <span className="change-value">
                      {notification.change > 0 ? '+' : ''}{notification.change.toFixed(1)}% change
                    </span>
                    <span className="change-details">
                      (Previous: {notification.previousValue.toFixed(2)}{getParameterUnit(notification.parameter)})
                    </span>
                  </div>
                )}
                <div className="notification-actions">
                  {notification.actions.map((action, actionIndex) => (
                    <button key={actionIndex} className="notification-action">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // =========================================
  //         MAIN RENDER
  // =========================================
  return (
    <div className="dashboard-container">
      {/* Animated Background */}
      <div className="bg-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo">
          <i className="fas fa-infinity"></i>
          INFINITY KISAN
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="dashboard-title">🌱 Smart Farming Dashboard</h1>

        {/* Notifications Panel */}
        {renderNotifications()}

        {/* Visualization Panel */}
        <div className="visualization-panel">
          <div className="visualization-header">
            <div className="visualization-title">
              <div className="visualization-icon"><i className="fas fa-chart-bar"></i></div>
              Farm Conditions Visualization
            </div>
          </div>
          <div className="visualization-grid">
            {renderVisualizations()}
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Combined Data Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <div className="card-icon"><i className="fas fa-cloud-sun"></i></div>
                Farm Conditions & Analysis
              </div>
            </div>
            
            <div className="data-tabs">
              <button 
                className={`data-tab ${activeTab === 'weather' ? 'active' : ''}`}
                onClick={() => setActiveTab('weather')}
              >
                Weather
              </button>
              <button 
                className={`data-tab ${activeTab === 'soil' ? 'active' : ''}`}
                onClick={() => setActiveTab('soil')}
              >
                Soil Analysis
              </button>
            </div>
            
            {/* Weather Tab */}
            <div className={`tab-content ${activeTab === 'weather' ? 'active' : ''}`}>
              {renderWeatherTab()}
            </div>
            
            {/* Soil Analysis Tab */}
            <div className={`tab-content ${activeTab === 'soil' ? 'active' : ''}`}>
              {renderSoilTab()}
            </div>
            
            <button 
              id="fetch-data-btn" 
              className="refresh-button" 
              style={{ marginTop: '25px' }}
              onClick={fetchAllData}
              disabled={isLoading}
            >
              <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-sync-alt'}`}></i>
              {isLoading ? 'Loading...' : 'Refresh All Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
            <h2>Loading Farm Data...</h2>
          </div>
        </div>
      )}
    </div>   
  );
};

export default Dashboard;