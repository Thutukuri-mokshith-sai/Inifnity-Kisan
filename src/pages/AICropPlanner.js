import React, { useState } from 'react';

// Utility to safely extract valid JSON using bracket matching
function extractValidJSON(text) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  const firstBracket = text.indexOf("[");
  const lastBracket = text.lastIndexOf("]");
  let extracted = "";

  // Prioritize JSON array first (since our prompt expects an array)
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    extracted = text.slice(firstBracket, lastBracket + 1);
  } else if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    extracted = text.slice(firstBrace, lastBrace + 1);
  }
  return extracted.trim();
}

export default function AICropPlanner() {
  const [cropName, setCropName] = useState('');
  const [season, setSeason] = useState('');
  const [maturity, setMaturity] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [loadingSteps, setLoadingSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [achievement, setAchievement] = useState('');

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

  const generateCropPlan = async (e) => {
    e.preventDefault();

    if (!cropName || !season || !maturity) {
      setError('Please fill in all required fields.');
      setPlanData(null);
      return;
    }

    setError(null);
    setPlanData(null);

    const steps = [
      { icon: '🌱', text: 'Analyzing Crop Requirements...', status: 'pending' },
      { icon: '🌤️', text: 'Assessing Seasonal Conditions...', status: 'pending' },
      { icon: '📅', text: 'Planning Growth Timeline...', status: 'pending' },
      { icon: '💧', text: 'Optimizing Irrigation Schedule...', status: 'pending' },
      { icon: '🧪', text: 'Calculating Fertilizer Needs...', status: 'pending' },
      { icon: '🐛', text: 'Developing Pest Management...', status: 'pending' },
      { icon: '🤖', text: 'Generating AI Recommendations...', status: 'pending' },
      { icon: '📋', text: 'Finalizing Crop Plan...', status: 'pending' }
    ];

    setLoadingSteps(steps);
    setLoading(true);

    try {
      // Step 1: Analyzing Crop Requirements
      updateStep(0, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(0, 'completed');

      // Step 2: Assessing Seasonal Conditions
      updateStep(1, 'active');
      await new Promise(resolve => setTimeout(resolve, 900));
      updateStep(1, 'completed');

      // Step 3: Planning Growth Timeline
      updateStep(2, 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep(2, 'completed');

      // Step 4: Optimizing Irrigation Schedule
      updateStep(3, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(3, 'completed');

      // Step 5: Calculating Fertilizer Needs
      updateStep(4, 'active');
      await new Promise(resolve => setTimeout(resolve, 900));
      updateStep(4, 'completed');

      // Step 6: Developing Pest Management
      updateStep(5, 'active');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStep(5, 'completed');

      // Step 7: Generating AI Recommendations
      updateStep(6, 'active');
      await new Promise(resolve => setTimeout(resolve, 1200));

      const prompt = `
      Create a detailed crop growth plan for ${cropName} in the ${season} season with a maturity period of ${maturity} days.
      Return the data strictly in JSON format as an array of stages.
      Each stage should have these fields:
      [
        {
          "stage": "Land Preparation",
          "dayRange": "Day 1-10",
          "tasks": ["Plough the land", "Add farmyard manure", "Level the soil"],
          "fertilizers": ["Organic manure - 5 tons/acre"],
          "irrigation": "Light irrigation after soil preparation",
          "pestManagement": ["Use Trichoderma to prevent fungal diseases"],
          "notes": "Ensure proper drainage and sunlight exposure"
        }
      ]
      `;

      const apiUrl = "https://ecokisan-disease.onrender.com/chat";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          model: "openai/gpt-oss-20b",
          lang: language,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI server error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      // Extract clean JSON using bracket matching
      let jsonText = extractValidJSON(data.response);
      if (!jsonText) {
        throw new Error("No valid JSON structure found in AI response.");
      }

      let plan;
      try {
        plan = JSON.parse(jsonText);
      } catch (err) {
        throw new Error("Invalid JSON: " + err.message);
      }

      updateStep(6, 'completed');

      // Step 8: Finalizing Crop Plan
      updateStep(7, 'active');
      await new Promise(resolve => setTimeout(resolve, 800));
      updateStep(7, 'completed');

      setPlanData(plan);
      showAchievement('🌱 Crop Plan Generated Successfully!');
    } catch (error) {
      setError('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>
            <span>🌾</span>
            Smart Crop Planner Pro
          </h1>
        </div>

        <form style={styles.form} onSubmit={generateCropPlan}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Crop Name:</label>
            <input
              type="text"
              style={styles.input}
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="e.g., Rice"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Season:</label>
            <select
              style={styles.select}
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
            >
              <option value="">--Select Season--</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Zaid">Zaid</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Maturity Period (in days):</label>
            <input
              type="number"
              style={styles.input}
              value={maturity}
              onChange={(e) => setMaturity(e.target.value)}
              placeholder="e.g., 120"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Language:</label>
            <select
              style={styles.select}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            Generate Crop Plan
          </button>
        </form>

        {error && (
          <div style={styles.errorSection}>
            <div style={styles.errorTitle}>⚠️ Error</div>
            <p>{error}</p>
          </div>
        )}

        {planData && (
          <div style={styles.response}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>🌟 Your Personalized Crop Growth Plan</h2>
              <div style={styles.planSummary}>
                <div style={styles.summaryCard} className="summary-card">
                  <span style={styles.summaryIcon}>🌾</span>
                  <div>
                    <div style={styles.summaryLabel}>Crop</div>
                    <div style={styles.summaryValue}>{cropName}</div>
                  </div>
                </div>
                <div style={styles.summaryCard} className="summary-card">
                  <span style={styles.summaryIcon}>🌤️</span>
                  <div>
                    <div style={styles.summaryLabel}>Season</div>
                    <div style={styles.summaryValue}>{season}</div>
                  </div>
                </div>
                <div style={styles.summaryCard} className="summary-card">
                  <span style={styles.summaryIcon}>⏱️</span>
                  <div>
                    <div style={styles.summaryLabel}>Duration</div>
                    <div style={styles.summaryValue}>{maturity} days</div>
                  </div>
                </div>
                <div style={styles.summaryCard} className="summary-card">
                  <span style={styles.summaryIcon}>📊</span>
                  <div>
                    <div style={styles.summaryLabel}>Stages</div>
                    <div style={styles.summaryValue}>{planData.length}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.timelineContainer}>
              {planData.map((stage, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.timelineItem,
                    animation: `cardSlideIn 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  <div style={styles.timelineMarker}>
                    <div style={styles.markerCircle}>{index + 1}</div>
                    {index < planData.length - 1 && <div style={styles.markerLine}></div>}
                  </div>
                  
                  <div style={styles.planCard} className="plan-card">
                    <div style={styles.cardGradientBorder}></div>
                    <div style={styles.planHeader}>
                      <div style={styles.planStage}>
                        <span style={styles.stageEmoji}>🌱</span>
                        {stage.stage || "Unnamed Stage"}
                      </div>
                      <div style={styles.planDay}>
                        <span style={styles.dayIcon}>📅</span>
                        {stage.dayRange || ""}
                      </div>
                    </div>
                    
                    <div style={styles.cardContent}>
                      <div style={styles.planSection}>
                        <div style={styles.sectionHeader}>
                          <span style={styles.sectionIcon}>✅</span>
                          <strong style={styles.sectionTitle}>Tasks to Complete</strong>
                        </div>
                        <div style={styles.taskGrid}>
                          {(stage.tasks || []).map((task, i) => (
                            <div key={i} style={styles.taskItem} className="task-item">
                              <span style={styles.taskBullet}>▸</span>
                              <span style={styles.taskText}>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={styles.twoColumnSection}>
                        <div style={styles.planSection}>
                          <div style={styles.sectionHeader}>
                            <span style={styles.sectionIcon}>💧</span>
                            <strong style={styles.sectionTitle}>Irrigation</strong>
                          </div>
                          <div style={styles.infoBox}>
                            {stage.irrigation || "Not specified"}
                          </div>
                        </div>

                        <div style={styles.planSection}>
                          <div style={styles.sectionHeader}>
                            <span style={styles.sectionIcon}>🧪</span>
                            <strong style={styles.sectionTitle}>Fertilizers</strong>
                          </div>
                          <div style={styles.fertilizerList}>
                            {(stage.fertilizers || []).map((fertilizer, i) => (
                              <div key={i} style={styles.fertilizerItem}>
                                <span style={styles.fertilizerDot}>●</span>
                                {fertilizer}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={styles.planSection}>
                        <div style={styles.sectionHeader}>
                          <span style={styles.sectionIcon}>🛡️</span>
                          <strong style={styles.sectionTitle}>Pest & Disease Management</strong>
                        </div>
                        <div style={styles.pestGrid}>
                          {(stage.pestManagement || []).map((pest, i) => (
                            <div key={i} style={styles.pestItem}>
                              <span style={styles.pestIcon}>🐛</span>
                              {pest}
                            </div>
                          ))}
                        </div>
                      </div>

                      {stage.notes && (
                        <div style={styles.notesSection}>
                          <div style={styles.notesBanner}>
                            <span style={styles.notesIcon}>💡</span>
                            <strong>Important Notes</strong>
                          </div>
                          <p style={styles.notesText}>{stage.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
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
            <div style={styles.loadingSubtext}>Creating personalized crop growth plan</div>
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
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 20px rgba(46, 139, 87, 0.4); }
          50% { box-shadow: 0 0 40px rgba(46, 139, 87, 0.8); }
          100% { box-shadow: 0 0 20px rgba(46, 139, 87, 0.4); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .summary-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(46, 139, 87, 0.2) !important;
        }
        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
        }
        .task-item:hover {
          background: linear-gradient(135deg, #d4f1d4 0%, #e8f5e9 100%) !important;
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: 0,
    padding: '40px',
    color: '#333',
    minHeight: '100vh'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    animation: 'slideIn 0.6s ease-out'
  },
  header: {
    background: 'linear-gradient(135deg, #2e8b57 0%, #1f6b3d 100%)',
    color: 'white',
    padding: '30px',
    textAlign: 'center'
  },
  h1: {
    color: 'white',
    textAlign: 'center',
    fontSize: '2.5em',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
  },
  form: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    maxWidth: '550px',
    margin: '0 auto 30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginTop: '15px',
    fontWeight: 600,
    fontSize: '1em',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginTop: '6px',
    border: '2px solid #2e8b57',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box',
    background: '#e8f5e9'
  },
  select: {
    width: '100%',
    padding: '12px',
    marginTop: '6px',
    border: '2px solid #2e8b57',
    borderRadius: '6px',
    fontSize: '16px',
    boxSizing: 'border-box',
    background: '#e8f5e9',
    cursor: 'pointer'
  },
  button: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #2e8b57 0%, #1f6b3d 100%)',
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
    transition: '0.2s',
    marginTop: '20px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  response: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px'
  },
  resultsHeader: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  resultsTitle: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #2e8b57 0%, #4caf50 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '30px'
  },
  planSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  summaryCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9f4 100%)',
    borderRadius: '15px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 4px 15px rgba(46, 139, 87, 0.1)',
    border: '2px solid rgba(46, 139, 87, 0.1)',
    transition: 'all 0.3s'
  },
  summaryIcon: {
    fontSize: '2.5em',
    animation: 'float 3s ease-in-out infinite'
  },
  summaryLabel: {
    fontSize: '0.85em',
    color: '#666',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  summaryValue: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: '#2e8b57',
    marginTop: '5px'
  },
  timelineContainer: {
    position: 'relative',
    padding: '20px 0'
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative'
  },
  timelineMarker: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '30px',
    position: 'relative'
  },
  markerCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2e8b57 0%, #4caf50 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2em',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(46, 139, 87, 0.4)',
    zIndex: 2
  },
  markerLine: {
    width: '3px',
    flexGrow: 1,
    background: 'linear-gradient(to bottom, #2e8b57, #a5d6a7)',
    marginTop: '10px',
    minHeight: '50px'
  },
  planCard: {
    background: 'white',
    flex: 1,
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s',
    position: 'relative',
    overflow: 'hidden'
  },
  cardGradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: 'linear-gradient(90deg, #2e8b57, #4caf50, #66bb6a, #4caf50, #2e8b57)',
    backgroundSize: '200% 100%',
    animation: 'gradientShift 3s ease infinite'
  },
  planHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 30px 20px',
    background: 'linear-gradient(135deg, #f0f9f4 0%, #ffffff 100%)',
    borderBottom: '2px solid #e8f5e9'
  },
  planStage: {
    fontSize: '1.6em',
    fontWeight: 'bold',
    color: '#2e8b57',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  stageEmoji: {
    fontSize: '1.2em',
    animation: 'float 2s ease-in-out infinite'
  },
  planDay: {
    fontSize: '1em',
    color: '#666',
    background: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '2px solid #e8f5e9',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  dayIcon: {
    fontSize: '1.2em'
  },
  cardContent: {
    padding: '30px'
  },
  planSection: {
    marginBottom: '25px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  sectionIcon: {
    fontSize: '1.5em'
  },
  sectionTitle: {
    fontSize: '1.1em',
    color: '#333',
    fontWeight: '700'
  },
  taskGrid: {
    display: 'grid',
    gap: '12px'
  },
  taskItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%)',
    borderRadius: '10px',
    borderLeft: '4px solid #4caf50',
    transition: 'all 0.2s'
  },
  taskBullet: {
    color: '#2e8b57',
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginTop: '2px'
  },
  taskText: {
    color: '#333',
    fontSize: '0.95em',
    lineHeight: '1.6'
  },
  twoColumnSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  infoBox: {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f9ff 100%)',
    padding: '15px 20px',
    borderRadius: '12px',
    color: '#1565c0',
    fontSize: '0.95em',
    lineHeight: '1.6',
    border: '2px solid #bbdefb',
    fontWeight: '500'
  },
  fertilizerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  fertilizerItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #fff3e0 0%, #fffaf0 100%)',
    borderRadius: '10px',
    color: '#e65100',
    fontSize: '0.95em',
    fontWeight: '500',
    border: '2px solid #ffe0b2'
  },
  fertilizerDot: {
    fontSize: '1.2em',
    color: '#ff9800'
  },
  pestGrid: {
    display: 'grid',
    gap: '12px'
  },
  pestItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #fce4ec 0%, #fff5f7 100%)',
    borderRadius: '10px',
    color: '#c62828',
    fontSize: '0.95em',
    fontWeight: '500',
    border: '2px solid #f8bbd0'
  },
  pestIcon: {
    fontSize: '1.3em'
  },
  notesSection: {
    marginTop: '25px',
    background: 'linear-gradient(135deg, #fff9c4 0%, #fffef0 100%)',
    borderRadius: '15px',
    overflow: 'hidden',
    border: '2px solid #fff176',
    boxShadow: '0 4px 12px rgba(255, 235, 59, 0.2)'
  },
  notesBanner: {
    background: 'linear-gradient(135deg, #ffd54f 0%, #ffeb3b 100%)',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#f57f17',
    fontWeight: 'bold',
    fontSize: '1.05em'
  },
  notesIcon: {
    fontSize: '1.5em'
  },
  notesText: {
    padding: '20px',
    margin: 0,
    color: '#f57f17',
    fontSize: '0.95em',
    lineHeight: '1.7',
    fontWeight: '500'
  },
    loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
    },
    loadingContent: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    width: '400px'
    },
    loadingSpinner: {
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #2e8b57',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
    },
    loadingText: {
    fontSize: '1.2em',
        
    fontWeight: '600',
    color: '#2e8b57',
    marginBottom: '10px'
    },
    loadingSubtext: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '20px'
    },
    progressSteps: {
    textAlign: 'left',
    maxHeight: '200px',
    overflowY: 'auto'
    },
    progressStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    color: '#999'
    },
    progressStepActive: {
    color: '#2e8b57',
    fontWeight: '600'
    },
    progressStepCompleted: {
    color: '#4caf50',
        
    fontWeight: '600'
    },
    stepIcon: {
    fontSize: '1.5em'
    },
    stepText: {
    flex: 1,
    fontSize: '1em'
    },
    stepStatus: {
    fontSize: '1.2em'
    },
    errorSection: {
    background: '#ffebee',
    border: '2px solid #f44336',
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '600px',
    margin: '20px auto',
    color: '#b71c1c'
    },
    errorTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px'
    }
}