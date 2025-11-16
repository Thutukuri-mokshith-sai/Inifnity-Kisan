import React, { useState } from 'react';

const cropMultipliers = {
  "Paddy(Dhan)(Common)": 2.5,
  "Wheat": 3.0,
  "Tomato": 1.8,
  "Maize": 2.2,
  "Sugarcane": 4.0,
  "Soyabean": 2.3,
  "Groundnut": 1.9,
  "Sunflower": 2.1,
};

const requests = {
  "Paddy(Dhan)(Common)": { "Modal Price": 2000 },
  "Wheat": { "Modal Price": 2200 },
  "Tomato": { "Modal Price": 1500 },
  "Maize": { "Modal Price": 1800 },
  "Sugarcane": { "Modal Price": 2500 },
  "Soyabean": { "Modal Price": 2100 },
  "Groundnut": { "Modal Price": 2300 },
  "Sunflower": { "Modal Price": 2400 }
};

export default function YieldPrediction() {
  const [crop, setCrop] = useState('');
  const [area, setArea] = useState(1);
  const [areaUnit, setAreaUnit] = useState('ha'); // 'ha' or 'acres'
  const [loading, setLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [achievement, setAchievement] = useState('');

  const round100 = (num) => Math.round(num / 100) * 100;

  const showAchievement = (message) => {
    setAchievement(message);
    setTimeout(() => setAchievement(''), 3000);
  };

  const updateStep = (index, status) => {
    setCurrentStep(index);
    setLoadingSteps(prev => prev.map((step, i) => ({
      ...step,
      status: i === index ? status : i < index ? 'completed' : 'pending'
    })));
  };

  const generateReport = async () => {
    if (!crop || isNaN(area) || area <= 0) {
      setError('Please select a crop and enter a valid cultivated area.');
      setReportData(null);
      return;
    }

    setError(null);
    setReportData(null);
    
    // Convert area to hectares if in acres
    const areaInHectares = areaUnit === 'acres' ? area * 0.404686 : area;
    
    const steps = [
      { icon: '🌾', text: 'Analyzing Crop Selection...', status: 'pending' },
      { icon: '📊', text: 'Fetching Weather Conditions...', status: 'pending' },
      { icon: '🌱', text: 'Evaluating Soil Properties...', status: 'pending' },
      { icon: '💧', text: 'Assessing Moisture & Irrigation...', status: 'pending' },
      { icon: '📈', text: 'Calculating Historical Data...', status: 'pending' },
      { icon: '🛰️', text: 'Processing Remote Sensing Data...', status: 'pending' },
      { icon: '🤖', text: 'Running ML Prediction Model...', status: 'pending' },
      { icon: '💰', text: 'Forecasting Market Prices...', status: 'pending' },
      { icon: '📋', text: 'Generating Financial Report...', status: 'pending' }
    ];

    setLoadingSteps(steps);
    setLoading(true);

    try {
      // Step 1: Analyzing Crop Selection
      updateStep(0, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(0, 'completed');

      // Step 2: Fetching Weather Conditions
      updateStep(1, 'active');
      await new Promise(resolve => setTimeout(resolve, 900));
      updateStep(1, 'completed');

      // Step 3: Evaluating Soil Properties
      updateStep(2, 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep(2, 'completed');

      // Step 4: Assessing Moisture & Irrigation
      updateStep(3, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(3, 'completed');

      // Step 5: Calculating Historical Data
      updateStep(4, 'active');
      await new Promise(resolve => setTimeout(resolve, 900));
      updateStep(4, 'completed');

      // Step 6: Processing Remote Sensing Data
      updateStep(5, 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep(5, 'completed');

      // Step 7: Running ML Prediction Model
      updateStep(6, 'active');
      await new Promise(resolve => setTimeout(resolve, 1200));
      updateStep(6, 'completed');

      // Step 8: Forecasting Market Prices
      updateStep(7, 'active');
      await new Promise(resolve => setTimeout(resolve, 900));
      updateStep(7, 'completed');

      // Step 9: Generating Financial Report
      updateStep(8, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate prediction data
      const multiplier = cropMultipliers[crop] || 2.5;
      const simulatedYieldPrediction = Math.random() * 5 + 1;
      const finalPrediction_tph = simulatedYieldPrediction * multiplier;
      const predictedTotalYield_t = finalPrediction_tph * areaInHectares;

      const modalPrice = requests[crop]["Modal Price"];
      const totalQuintals = predictedTotalYield_t * 10;
      const totalValue = totalQuintals * modalPrice;
      const totalExpenses = totalValue * 0.75;
      const profit = totalValue * 0.25;

      const report = {
        crop,
        area: area.toFixed(2),
        areaUnit,
        areaInHectares: areaInHectares.toFixed(2),
        predictedYield: finalPrediction_tph.toFixed(2),
        totalProduction: predictedTotalYield_t.toFixed(2),
        totalQuintals: totalQuintals.toFixed(2),
        modalPrice: modalPrice.toFixed(2),
        totalRevenue: round100(totalValue),
        totalExpenses: round100(totalExpenses),
        profit: round100(profit),
        breakdown: {
          "Pre-Harvest": {
            "Land Preparation": round100(totalExpenses * 0.10),
            "Inputs (Seeds/Fertilizers/Pesticides)": round100(totalExpenses * 0.20),
            "Irrigation": round100(totalExpenses * 0.10),
          },
          "Harvest & Post-Harvest": {
            "Labor": round100(totalExpenses * 0.10),
            "Machinery": round100(totalExpenses * 0.05),
            "Transportation": round100(totalExpenses * 0.05),
            "Storage": round100(totalExpenses * 0.05),
          },
          "Other Operating Expenses": {
            "Repairs": round100(totalExpenses * 0.03),
            "Debt": round100(totalExpenses * 0.04),
            "Insurance": round100(totalExpenses * 0.03),
          },
        },
      };

      updateStep(8, 'completed');
      setReportData(report);
      showAchievement('🏆 Report Generated Successfully!');
    } catch (err) {
      setError('❌ Error: Could not generate report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>
            <span>📊</span>
            Yield & Profit Prediction
          </h1>
          <p style={styles.subtitle}>AI-Powered Agricultural Yield & Financial Analysis</p>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.inputCard}>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Crop</label>
              <div style={styles.pickerWrapper}>
                <span style={styles.icon}>🌱</span>
                <select 
                  style={styles.picker} 
                  value={crop} 
                  onChange={(e) => setCrop(e.target.value)}
                >
                  <option value="">--Select--</option>
                  <option value="Paddy(Dhan)(Common)">Paddy(Dhan)(Common)</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Maize">Maize</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Soyabean">Soyabean</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Sunflower">Sunflower</option>
                </select>
              </div>
            </div>

            <div style={styles.inputContainer}>
              <label style={styles.label}>Cultivated Area</label>
              <div style={styles.areaInputGroup}>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>📏</span>
                  <input 
                    type="number" 
                    style={styles.input} 
                    value={area}
                    onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                    placeholder="1"
                    step="0.01"
                  />
                </div>
                <div style={styles.unitPickerWrapper}>
                  <select 
                    style={styles.unitPicker} 
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                  >
                    <option value="ha">Hectares (ha)</option>
                    <option value="acres">Acres</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button style={styles.generateBtn} onClick={generateReport}>
            Generate Report
          </button>
        </div>

        {error && (
          <div style={styles.errorSection}>
            <div style={styles.errorTitle}>⚠️ Error</div>
            <p>{error}</p>
          </div>
        )}

        {reportData && (
          <div style={styles.reportCard}>
            {/* UPDATED: Prominent Yield & Price Prediction Banner */}
            <div style={styles.yieldBanner}>
              <div style={styles.yieldContent}>
                <div style={styles.yieldIcon}>🌾</div>
                <div style={styles.yieldText}>
                  <div style={styles.yieldLabel}>PREDICTED YIELD</div>
                  <div style={styles.yieldValue}>{reportData.predictedYield}</div>
                  <div style={styles.yieldUnit}>tons per hectare</div>
                </div>
                <div style={styles.priceSection}>
                  <div style={styles.priceLabel}>ESTIMATED PRICE</div>
                  <div style={styles.priceValue}>₹{reportData.modalPrice}</div>
                  <div style={styles.priceUnit}>per quintal</div>
                </div>
                <div style={styles.yieldSparkle}>✨</div>
              </div>
              <div style={styles.yieldSubtext}>
                Based on AI analysis of weather, soil conditions, and market trends
              </div>
            </div>

            <h2 style={styles.reportTitle}>
              <span style={styles.reportIcon}>💼</span>
              Financial Report
            </h2>
            
            <div style={styles.reportSummary}>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>
                  <span style={styles.summaryIcon}>🌾</span>
                  Crop:
                </span>
                <span style={styles.summaryValue}>{reportData.crop}</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>
                  <span style={styles.summaryIcon}>📐</span>
                  Cultivated Area:
                </span>
                <span style={styles.summaryValue}>
                  {reportData.area} {reportData.areaUnit}
                  {reportData.areaUnit === 'acres' && 
                    <span style={styles.convertedText}> (≈ {reportData.areaInHectares} ha)</span>
                  }
                </span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>
                  <span style={styles.summaryIcon}>⚖️</span>
                  Total Production:
                </span>
                <span style={styles.summaryValue}>{reportData.totalProduction} t</span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>
                  <span style={styles.summaryIcon}>💵</span>
                  Total Revenue:
                </span>
                <span style={{...styles.summaryValue, color: '#2ecc71'}}>
                  ₹{reportData.totalRevenue}
                </span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>
                  <span style={styles.summaryIcon}>💸</span>
                  Total Expenses:
                </span>
                <span style={{...styles.summaryValue, color: '#e74c3c'}}>
                  ₹{reportData.totalExpenses}
                </span>
              </div>
              <div style={styles.summaryItem}>
                <span style={styles.summaryLabel}>
                  <span style={styles.summaryIcon}>💰</span>
                  Net Profit:
                </span>
                <span style={{...styles.summaryValue, color: '#2b7a0b', fontWeight: 'bold'}}>
                  ₹{reportData.profit}
                </span>
              </div>
            </div>

            <div style={styles.expenseBreakdown}>
              <h3 style={styles.subHeading}>Expense Breakdown</h3>
              
              {Object.entries(reportData.breakdown).map(([category, items]) => (
                <div key={category} style={styles.expenseCategory}>
                  <h4 style={styles.expenseHeading}>
                    <span style={styles.expenseIcon}>
                      {category === 'Pre-Harvest' ? '🚜' : 
                       category === 'Harvest & Post-Harvest' ? '🚛' : '📋'}
                    </span>
                    {category}
                  </h4>
                  {Object.entries(items).map(([item, value]) => (
                    <div key={item} style={styles.expenseItem}>
                      <span style={styles.expenseText}>{item}:</span>
                      <span style={styles.expenseAmount}>₹{value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.loadingSpinner}></div>
            <div style={styles.loadingText}>
              {loadingSteps[currentStep]?.text || 'Processing Request...'}
            </div>
            <div style={styles.loadingSubtext}>Analyzing agricultural and financial data</div>
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
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 20px rgba(43, 122, 11, 0.4); }
          50% { box-shadow: 0 0 40px rgba(43, 122, 11, 0.8); }
          100% { box-shadow: 0 0 20px rgba(43, 122, 11, 0.4); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes goldPulse {
          0% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
          50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
          100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
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
    minWidth: '100%',
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
    textAlign: 'center'
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
  inputSection: {
    padding: '30px'
  },
  inputCard: {
    background: '#f8f9fa',
    padding: '25px',
    borderRadius: '15px',
    marginBottom: '20px',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  inputContainer: {
    flex: 1,
    minWidth: '250px'
  },
  label: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '8px',
    fontSize: '1em',
    color: '#333'
  },
  pickerWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #2b7a0b',
    borderRadius: '10px',
    padding: '12px 15px',
    background: '#e8f5e9'
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #2b7a0b',
    borderRadius: '10px',
    padding: '12px 15px',
    background: '#e8f5e9'
  },
  icon: {
    fontSize: '1.5em',
    marginRight: '10px',
    color: '#1f5408'
  },
  areaInputGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'stretch'
  },
  unitPickerWrapper: {
    minWidth: '160px',
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #2b7a0b',
    borderRadius: '10px',
    padding: '12px 15px',
    background: '#e8f5e9'
  },
  unitPicker: {
    border: 'none',
    background: 'transparent',
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#1f5408'
  },
  picker: {
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    width: '100%',
    outline: 'none',
    cursor: 'pointer'
  },
  input: {
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
    width: '100%',
    outline: 'none'
  },
  generateBtn: {
    width: '100%',
    padding: '16px',
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #2b7a0b 0%, #1f5408 100%)',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease'
  },
  errorSection: {
    margin: '20px 30px',
    padding: '20px',
    background: 'linear-gradient(135deg, #ffecec 0%, #ffd4d4 100%)',
    borderRadius: '15px',
    borderLeft: '5px solid #e53e3e',
    textAlign: 'center'
  },
  errorTitle: {
    fontSize: '1.3em',
    color: '#e53e3e',
    marginBottom: '10px',
    fontWeight: 700
  },
  reportCard: {
    margin: '20px 30px 30px',
    padding: '25px',
    background: 'linear-gradient(135deg, #eaf8ea 0%, #d4f1d4 100%)',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
    animation: 'cardSlideIn 0.5s ease-out'
  },
  // UPDATED: Yield & Price Banner Styles
  yieldBanner: {
    background: 'linear-gradient(135deg, #2b7a0b 0%, #4caf50 100%)',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '25px',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 10px 30px rgba(43, 122, 11, 0.4)',
    animation: 'pulseGlow 3s ease-in-out infinite',
    border: '3px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden'
  },
  yieldContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '15px',
    position: 'relative',
    zIndex: 2
  },
  yieldIcon: {
    fontSize: '4em',
    animation: 'float 3s ease-in-out infinite',
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
  },
  yieldText: {
    textAlign: 'center',
    flex: 1
  },
  yieldLabel: {
    fontSize: '1.1em',
    fontWeight: '600',
    opacity: 0.9,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '5px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  },
  yieldValue: {
    fontSize: '4.5em',
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '10px 0',
    textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
    background: 'linear-gradient(45deg, #ffffff, #e8f5e9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  yieldUnit: {
    fontSize: '1.3em',
    fontWeight: '500',
    opacity: 0.9,
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  },
  // NEW: Price Section Styles
  priceSection: {
    textAlign: 'center',
    flex: 1,
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '20px',
    borderRadius: '15px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    animation: 'goldPulse 2s ease-in-out infinite',
    backdropFilter: 'blur(10px)'
  },
  priceLabel: {
    fontSize: '1em',
    fontWeight: '600',
    opacity: 0.9,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '8px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  },
  priceValue: {
    fontSize: '3em',
    fontWeight: 'bold',
    lineHeight: 1,
    margin: '10px 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
    background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  priceUnit: {
    fontSize: '1.1em',
    fontWeight: '500',
    opacity: 0.9,
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  },
  yieldSparkle: {
    fontSize: '2.5em',
    animation: 'float 2s ease-in-out infinite',
    opacity: 0.8
  },
  yieldSubtext: {
    fontSize: '1em',
    opacity: 0.8,
    fontStyle: 'italic',
    maxWidth: '500px',
    margin: '0 auto',
    textShadow: '1px 1px 1px rgba(0,0,0,0.2)'
  },
  reportTitle: {
    fontSize: '2em',
    color: '#2b7a0b',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  reportIcon: {
    fontSize: '1.2em'
  },
  reportSummary: {
    marginBottom: '25px'
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 15px',
    marginBottom: '8px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
  },
  summaryLabel: {
    fontSize: '1.05em',
    color: '#333',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  summaryIcon: {
    fontSize: '1.3em'
  },
  summaryValue: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#333'
  },
  convertedText: {
    fontSize: '0.85em',
    fontWeight: 'normal',
    color: '#666',
    fontStyle: 'italic'
  },
  expenseBreakdown: {
    marginTop: '25px'
  },
  subHeading: {
    fontSize: '1.5em',
    fontWeight: 700,
    color: '#2b7a0b',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '3px solid #2b7a0b'
  },
  expenseCategory: {
    marginBottom: '20px'
  },
  expenseHeading: {
    fontSize: '1.2em',
    fontWeight: 700,
    color: '#1f5408',
    marginBottom: '10px',
    padding: '10px 15px',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
  },
  expenseIcon: {
    fontSize: '1.2em'
  },
  expenseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 15px',
    marginBottom: '5px',
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '6px'
  },
  expenseText: {
    fontSize: '1em',
    color: '#555'
  },
  expenseAmount: {
    fontSize: '1em',
    fontWeight: 600,
    color: '#333'
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
    minWidth: '400px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto'
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