import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DailyMarketPrices = () => {
  const [states] = useState([
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');
  const [currentUnit, setCurrentUnit] = useState('quintal');
  const [showTable, setShowTable] = useState(false);

  const apiKey = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
  const baseUrl = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

  const conversionFactors = {
    quintal: 1,
    tonne: 0.1,
    kg: 100,
    pound: 220.462,
    ounce: 3527.396
  };

  const unitLabels = {
    quintal: 'Quintal (100kg)',
    tonne: 'Tonne',
    kg: 'Kilogram',
    pound: 'Pound (lb)',
    ounce: 'Ounce (oz)'
  };

  const fetchData = async (params = {}) => {
    setLoading(true);
    setError('');

    try {
      const url = new URL(baseUrl);
      url.searchParams.append("api-key", apiKey);
      url.searchParams.append("format", "json");
      url.searchParams.append("limit", "100");

      for (const key in params) {
        if (params[key]) url.searchParams.append(key, params[key]);
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data.records || [];
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch data. Please check your connection and try again.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const populateDistricts = async (state) => {
    const records = await fetchData({ "filters[state.keyword]": state });
    const uniqueDistricts = [...new Set(records.map(r => r.district).filter(Boolean))];
    setDistricts(uniqueDistricts.sort());
  };

  const populateCommodities = async (state, district) => {
    const records = await fetchData({
      "filters[state.keyword]": state,
      "filters[district]": district
    });
    const uniqueCommodities = [...new Set(records.map(r => r.commodity).filter(Boolean))];
    setCommodities(uniqueCommodities.sort());
  };

  const convertPrice = (pricePerQuintal, targetUnit) => {
    if (!pricePerQuintal || isNaN(pricePerQuintal)) return '-';
    const factor = conversionFactors[targetUnit];
    const convertedPrice = pricePerQuintal / factor;
    return convertedPrice.toFixed(2);
  };

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict('');
    setSelectedCommodity('');
    setDistricts([]);
    setCommodities([]);
    setShowTable(false);
    
    if (state) {
      await populateDistricts(state);
    }
  };

  const handleDistrictChange = async (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedCommodity('');
    setCommodities([]);
    setShowTable(false);
    
    if (district && selectedState) {
      await populateCommodities(selectedState, district);
    }
  };

  const handleCommodityChange = (e) => {
    setSelectedCommodity(e.target.value);
    setShowTable(false);
  };

  const handleFetchPrices = async () => {
    if (!selectedState || !selectedDistrict || !selectedCommodity) {
      alert("⚠️ Please select a state, district, and commodity.");
      return;
    }

    const filters = {
      "filters[state.keyword]": selectedState,
      "filters[district]": selectedDistrict,
      "filters[commodity]": selectedCommodity,
    };
    const records = await fetchData(filters);
    setAllRecords(records);
    setFilteredRecords(records);
    setShowTable(records.length > 0);
  };

  const handleFilterChange = (e) => {
    const text = e.target.value.toLowerCase();
    setFilterText(text);
    const filtered = allRecords.filter(record =>
      Object.values(record).some(value =>
        String(value).toLowerCase().includes(text)
      )
    );
    setFilteredRecords(filtered);
  };

  const handleUnitChange = (unit) => {
    setCurrentUnit(unit);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-float { 
          animation: float 3s ease-in-out infinite; 
        }
        .animate-fade-in { 
          animation: fadeIn 0.8s ease-out; 
        }
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .daily-market-prices {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #c8e6c9 0%, #dcedc8 50%, #f1f8e9 100%);
        }
        
        .hero-section {
          background: linear-gradient(135deg, #2e7d32 0%, #558b2f 100%);
          padding: 40px 20px;
          border-radius: 20px;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '🌾';
          position: absolute;
          font-size: 200px;
          opacity: 0.1;
          right: -50px;
          top: -50px;
        }
        
        .info-banner {
          background: linear-gradient(135deg, #fdd835 0%, #fbc02d 100%);
          border-radius: 15px;
          padding: 20px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 8px 20px rgba(253, 216, 53, 0.3);
        }
        
        .feature-icon {
          width: 60px;
          height: 60px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }
        
        .stats-card {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border-left: 5px solid #2e7d32;
        }
        
        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }
        
        .picker-wrapper {
          position: relative;
          margin-bottom: 20px;
        }
        
        .picker-wrapper::after {
          content: '▼';
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #2e7d32;
          font-size: 12px;
        }
        
        .custom-select {
          height: 55px;
          border: 2px solid #2e7d32;
          border-radius: 15px;
          font-weight: 600;
          padding: 0 40px 0 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          appearance: none;
        }
        
        .custom-select:focus {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
          border-color: #1b5e20;
        }
        
        .selection-text {
          color: #1b5e20;
          font-size: 18px;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .fetch-button {
          background: linear-gradient(135deg, #2e7d32 0%, #558b2f 100%);
          border-radius: 30px;
          padding: 16px 40px;
          border: none;
          box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          color: white;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        .fetch-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(46, 125, 50, 0.4);
        }
        
        .fetch-button:disabled {
          background: linear-gradient(135deg, #ccc 0%, #999 100%);
          cursor: not-allowed;
          box-shadow: none;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 30px;
          border: 2px solid #2e7d32;
          padding: 0 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .search-input-wrapper:focus-within {
          box-shadow: 0 12px 30px rgba(46, 125, 50, 0.3);
          transform: scale(1.02);
        }
        
        .search-input {
          flex: 1;
          height: 50px;
          background: transparent;
          border: none;
          outline: none;
          font-weight: 600;
        }
        
        .unit-button {
          background: white;
          border: 2px solid #2e7d32;
          border-radius: 20px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .unit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(46, 125, 50, 0.3);
        }
        
        .unit-button.active {
          background: linear-gradient(135deg, #2e7d32 0%, #558b2f 100%);
          color: white;
          border-color: #1b5e20;
        }
        
        .conversion-info {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 15px;
          padding: 15px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .conversion-icon {
          font-size: 40px;
        }
        
        .table-responsive {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          margin-top: 30px;
        }
        
        .custom-table {
          margin-bottom: 0;
        }
        
        .custom-table thead {
          background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
          color: white;
        }
        
        .custom-table thead th {
          font-weight: 700;
          text-align: center;
          padding: 20px 10px;
          border: none;
          font-size: 14px;
        }
        
        .custom-table tbody tr {
          transition: all 0.3s ease;
        }
        
        .custom-table tbody tr:nth-child(even) {
          background-color: #e8f5e9;
        }
        
        .custom-table tbody tr:hover {
          background-color: #f1f8e9 !important;
          transform: scale(1.01);
        }
        
        .custom-table tbody td {
          text-align: center;
          padding: 15px 10px;
          font-weight: 600;
          font-size: 14px;
          vertical-align: middle;
        }
        
        .price-badge {
          background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 700;
          display: inline-block;
        }
        
        .no-data-text {
          color: #795548;
          text-align: center;
          margin-top: 30px;
          font-size: 18px;
          font-weight: 600;
        }
        
        .spinner-border-custom {
          width: 50px;
          height: 50px;
          color: #2e7d32;
        }
      `}</style>

      <div className="daily-market-prices">
        <div className="container py-4">
          {/* Hero Section */}
          <div className="hero-section animate-fade-in">
            <h1 className="text-center text-white display-4 fw-bold mb-3">
              <span className="animate-float" style={{ display: 'inline-block', fontSize: '24px', marginRight: '10px' }}>🌾</span>
              Daily Market Prices
              <span className="animate-float" style={{ display: 'inline-block', fontSize: '24px', marginLeft: '10px' }}>💹</span>
            </h1>
            <p className="text-center text-white fs-5" style={{ opacity: 0.9 }}>
              Get real-time agricultural commodity prices across India
            </p>
          </div>

          {/* Info Banner */}
          <div className="info-banner animate-fade-in">
            <div className="feature-icon">📊</div>
            <div>
              <h3 className="fw-bold fs-5 mb-1" style={{ color: '#1b5e20' }}>Live Market Data</h3>
              <p className="mb-0" style={{ color: '#33691e', fontSize: '14px' }}>
                Access up-to-date pricing information for agricultural commodities across all states
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4 animate-fade-in">
            {[
              { label: 'Total States', value: '31+', emoji: '🗺️' },
              { label: 'Commodities', value: '100+', emoji: '🌽' },
              { label: 'Updated', value: 'Daily', emoji: '⏰' }
            ].map((stat, idx) => (
              <div key={idx} className="col-md-4">
                <div className="stats-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1 fw-semibold" style={{ fontSize: '14px' }}>{stat.label}</p>
                      <p className="display-5 fw-bold mb-0" style={{ color: '#2e7d32' }}>{stat.value}</p>
                    </div>
                    <div style={{ fontSize: '50px', opacity: 0.2 }}>{stat.emoji}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Card */}
          <div className="card shadow-lg border-0 animate-fade-in" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4 p-md-5">
              {/* State Selection */}
              <label className="selection-text">
                <span className="fs-4">🏛️</span>
                Select Your State
              </label>
              <div className="picker-wrapper">
                <select
                  className="form-select custom-select"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">-- Choose State --</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              {selectedState && (
                <div className="animate-fade-in">
                  <label className="selection-text">
                    <span className="fs-4">🏙️</span>
                    Select Your District
                  </label>
                  <div className="picker-wrapper">
                    <select
                      className="form-select custom-select"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                    >
                      <option value="">-- Select District --</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Commodity Selection */}
              {selectedDistrict && (
                <div className="animate-fade-in">
                  <label className="selection-text">
                    <span className="fs-4">🌾</span>
                    Select Commodity
                  </label>
                  <div className="picker-wrapper">
                    <select
                      className="form-select custom-select"
                      value={selectedCommodity}
                      onChange={handleCommodityChange}
                    >
                      <option value="">-- Select Commodity --</option>
                      {commodities.map(commodity => (
                        <option key={commodity} value={commodity}>{commodity}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Fetch Button */}
              <button
                className="fetch-button mt-4"
                onClick={handleFetchPrices}
                disabled={!selectedState || !selectedDistrict || !selectedCommodity || loading}
              >
                <span style={{ fontSize: '24px' }}>₹</span>
                <span>Get Market Prices</span>
                <span style={{ fontSize: '20px' }}>→</span>
              </button>

              {/* Loading Indicator */}
              {loading && (
                <div className="text-center mt-5">
                  <div className="spinner-border spinner-border-custom" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="fw-semibold mt-3" style={{ color: '#2e7d32' }}>
                    Fetching latest prices... ⏳
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger mt-4 text-center fw-semibold" role="alert">
                  {error}
                </div>
              )}

              {/* Filter and Unit Selector */}
              {showTable && allRecords.length > 0 && (
                <>
                  {/* Filter Input */}
                  <div className="search-input-wrapper mt-4">
                    <span style={{ color: '#2e7d32', fontSize: '20px' }}>🔍</span>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search in results..."
                      value={filterText}
                      onChange={handleFilterChange}
                    />
                  </div>

                  {/* Unit Selector */}
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                    {Object.keys(conversionFactors).map(unit => (
                      <button
                        key={unit}
                        className={`unit-button ${currentUnit === unit ? 'active' : ''}`}
                        onClick={() => handleUnitChange(unit)}
                      >
                        <span>
                          {unit === 'quintal' ? '⚖️' : 
                           unit === 'tonne' ? '🏋️' : 
                           unit === 'kg' ? '📦' : 
                           unit === 'pound' ? '💪' : '🪶'}
                        </span>
                        <span>{unitLabels[unit]}</span>
                      </button>
                    ))}
                  </div>

                  {/* Conversion Info */}
                  {currentUnit !== 'quintal' && (
                    <div className="conversion-info">
                      <span className="conversion-icon">⚖️</span>
                      <div>
                        <h4 className="fw-bold mb-1" style={{ color: '#1b5e20', fontSize: '18px' }}>
                          Unit Conversion Active
                        </h4>
                        <p className="mb-0" style={{ color: '#33691e', fontSize: '14px' }}>
                          Prices converted from Quintal (100kg) to {unitLabels[currentUnit]}. 
                          1 Quintal = {conversionFactors[currentUnit].toFixed(2)} {unitLabels[currentUnit]}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Table */}
              {showTable && (
                <div className="table-responsive">
                  <table className="table custom-table">
                    <thead>
                      <tr>
                        <th>🏛️ State</th>
                        <th>🏙️ District</th>
                        <th>🏪 Market</th>
                        <th>🌾 Commodity</th>
                        <th>🔖 Variety</th>
                        <th>⭐ Grade</th>
                        <th>📉 Min Price</th>
                        <th>📈 Max Price</th>
                        <th>💰 Modal Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="py-5">
                            <div className="text-center">
                              <span className="d-block mb-3" style={{ fontSize: '50px' }}>🔍</span>
                              <p className="fw-semibold" style={{ color: '#795548' }}>
                                No matching records found. Try different filters!
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((record, index) => (
                          <tr key={index}>
                            <td>{record.state || '-'}</td>
                            <td>{record.district || '-'}</td>
                            <td>{record.market || '-'}</td>
                            <td>{record.commodity || '-'}</td>
                            <td>{record.variety || '-'}</td>
                            <td>{record.grade || '-'}</td>
                            <td>₹{convertPrice(record.min_price, currentUnit)}</td>
                            <td>₹{convertPrice(record.max_price, currentUnit)}</td>
                            <td>
                              <span className="price-badge">
                                ₹{convertPrice(record.modal_price, currentUnit)}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* No Data Text */}
              {!showTable && !loading && (
                <div className="no-data-text">
                  <span className="d-block mb-3" style={{ fontSize: '60px' }}>📋</span>
                  <p>
                    {selectedState && selectedDistrict && selectedCommodity
                      ? "All set! Click 'Get Market Prices' button above to fetch live data 🚀"
                      : "Select your filters above and click 'Get Market Prices' to view live data"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyMarketPrices;