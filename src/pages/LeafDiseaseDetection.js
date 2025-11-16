import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

/* --- CSS Variables - Light Palette --- */
const styles = {
    // Colors (Light Theme)
    primaryLightBg: '#f5f5f5', // Main Background (Off-White)
    secondaryCardBg: '#e8f5e9', // Light Card/Content Background (Pale Green/Mint)
    primaryGreen: '#4caf50', // Titles/Muted Labels/Success
    accentRed: '#d32f2f', // Active Item/Highlight/Error Button
    hoverLightGray: '#e0e0e0',
    textDark: '#212121', // Main Text Color
    textMuted: '#757575', // Muted labels
    inputBg: '#ffffff', // White for input fields
    
    // Derived/Hover Colors
    darkerRedHover: '#b71c1c',
    predictButtonBg: '#81c784', // Lighter Green for Predict Button
    predictButtonHover: '#66bb6a',
    titleColor: '#4caf50', // Primary Green
    errorColor: '#d32f2f', // Accent Red
    
    // General Styles
    body: {
        fontFamily: "'Roboto', sans-serif",
        color: '#212121', // Dark Text
        backgroundColor: '#f5f5f5', // Light Background
        minHeight: '100vh',
        lineHeight: 1.6,
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
    },
    gradientBg: {
        background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
        minHeight: '100vh',
        padding: '20px 0',
    },
    container: {
        maxWidth: '100%',
        minWidth:'100%',
        margin: '0 auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        background: '#ffffff', // White content background
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Lighter shadow
        width: '100%',
    },
    title: {
        fontSize: '2.2em',
        fontWeight: 'bold',
        color: '#4caf50', // Primary Green
        textAlign: 'center',
        marginBottom: '25px',
    },
    
    // Buttons
    buttonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px',
    },
    button: {
        flex: 1,
        minWidth: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d32f2f', // Accent Red
        padding: '12px 20px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        color: '#ffffff', // White Text
        fontWeight: '600',
    },
    buttonIcon: {
        color: '#ffffff',
        fontSize: '24px',
    },
    buttonText: {
        marginLeft: '10px',
        fontSize: '16px',
    },
    
    // Image Preview
    imagePreviewContainer: {
        marginBottom: '20px',
        border: '2px dashed #4caf50', // Primary Green dashed border
        borderRadius: '10px',
        backgroundColor: '#e8f5e9', // Pale Green background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        overflow: 'hidden',
    },
    imagePreview: {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '8px',
        objectFit: 'contain',
    },
    
    // Predict Button
    predictButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#81c784', // Lighter Green
        padding: '15px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        minHeight: '54px',
    },
    predictButtonDisabled: {
        backgroundColor: '#bdbdbd', // Light Gray for disabled
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    predictButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginLeft: '10px',
        fontSize: '18px',
    },
    
    // Results
    errorText: {
        color: '#d32f2f', // Accent Red
        textAlign: 'center',
        marginTop: '15px',
        fontSize: '16px',
        fontWeight: '500',
    },
    resultContainer: {
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0', // Light border
    },
    resultTitle: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#4caf50', // Primary Green
        marginBottom: '20px',
        textAlign: 'center',
    },
    resultCard: {
        background: '#e8f5e9', // Pale Green
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        marginBottom: '20px',
    },
    label: {
        fontSize: '1.1em',
        color: '#757575', // Muted Text
        margin: '5px 0',
    },
    labelText: {
        fontWeight: 'bold',
        color: '#d32f2f', // Accent Red
    },
    confidenceText: {
        fontWeight: 'bold',
        color: '#4caf50', // Primary Green
    },

    // Accordion
    card: {
        background: '#e8f5e9', // Pale Green
        borderRadius: '10px',
        marginBottom: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #c8e6c9', // Lighter border
    },
    accordionTitleWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
        cursor: 'pointer',
        backgroundColor: '#c8e6c9', // Very light green header
        borderBottom: '1px solid #e0e0e0',
        transition: 'background-color 0.2s ease',
    },
    accordionTitle: {
        fontWeight: 'bold',
        color: '#212121', // Dark Text
        fontSize: '1.1em',
        display: 'flex',
        alignItems: 'center',
    },
    accordionIcon: {
        marginRight: '12px',
        color: '#4caf50', // Primary Green
        fontSize: '1.2em',
    },
    chevronIcon: {
        transition: 'transform 0.3s ease',
        color: '#4caf50', // Primary Green
    },
    accordionContent: {
        padding: '15px 20px',
        lineHeight: 1.5,
        backgroundColor: '#f5f5f5', // Off-White content background
    },
    listItem: {
        backgroundColor: '#ffffff', // White item background
        borderLeft: '3px solid #d32f2f', // Accent Red line
        borderRadius: '5px',
        marginBottom: '10px',
        padding: '10px 15px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    listItemTitle: {
        fontSize: '1em',
        color: '#212121', // Dark Text
        margin: 0,
        fontWeight: '500',
    },
    listItemDescription: {
        fontSize: '0.85em',
        color: '#757575', // Muted Text
        marginTop: '5px',
        fontStyle: 'italic',
    }
};

const API_URL = 'https://ecokisan-disease.onrender.com/predict';
const SYNC_API_URL = 'https://your-backend-api.com/sync/prediction'; 

const AccordionSections = {
    'Symptoms': 'symptoms',
    'Prevention': 'prevention',
    'Safety Tips': 'safety_tips',
    'Organic Alternatives': 'organic_alternatives',
    'Treatments': 'treatments',
};

// Component for a single accordion card
const AccordionCard = ({ title, details }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const renderDetailContent = (item) => {
        if (typeof item === 'string') {
            return (
                <p style={styles.listItemTitle}>{item}</p>
            );
        } else {
            let descriptionText = `Dosage: ${item.dosage}`;
            if (item.brand_examples && item.brand_examples.length > 0) {
                descriptionText += ` • Brand Examples: ${item.brand_examples.join(', ')}`;
            }
            return (
                <>
                    <p style={styles.listItemTitle}>{item.name}: {item.application}</p>
                    {descriptionText && <p style={styles.listItemDescription}>{descriptionText}</p>}
                </>
            );
        }
    };

    return (
        <div style={styles.card}>
            <div 
                style={styles.accordionTitleWrapper} 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div style={styles.accordionTitle}>
                    <i className="fas fa-leaf" style={styles.accordionIcon}></i>
                    {title}
                </div>
                <i 
                    className={`fas fa-chevron-down`} 
                    style={{...styles.chevronIcon, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}
                ></i>
            </div>
            <div 
                style={{
                    ...styles.accordionContent, 
                    display: isExpanded ? 'block' : 'none' 
                }}
            >
                {details.map((item, index) => (
                    <div key={index} style={styles.listItem}>
                        {renderDetailContent(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main React Component
const LeafDiseaseDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    
    // State for Synchronization (Conceptual)
    const [userId] = useState('user-123'); // Placeholder User ID for persistence

    const fileInputRef = useRef(null);
    
    // --- Synchronization Function (Placeholder) ---
    const syncPrediction = async (predictionData, originalImage) => {
        try {
            const syncResponse = await fetch(SYNC_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}-token` 
                },
                body: JSON.stringify({
                    userId: userId,
                    prediction: predictionData,
                    timestamp: new Date().toISOString(),
                    imageUrl: imagePreviewUrl, 
                    originalFileName: originalImage.name
                }),
            });

            if (!syncResponse.ok) {
                console.error("Failed to sync prediction:", await syncResponse.json());
            } else {
                console.log("Prediction synchronized successfully.");
            }
        } catch (err) {
            console.error("Error during prediction sync:", err);
        }
    };
    // --- End Sync Function ---


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
            setResult(null);
            setError('');
        }
    };

    const handlePredict = async () => {
        if (!selectedFile) {
            setError('Please select an image first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || 'Prediction failed. Please try again.');
            }

            const newResult = {
                label: data.label,
                confidence: parseFloat(data.confidence).toFixed(2),
                details: data.disease_details,
            };

            setResult(newResult);
            
            await syncPrediction(newResult, selectedFile); 

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCapturePhoto = () => {
        alert('Camera functionality is not supported in this web example. Please use "Upload Image" instead.');
    };

    // --- CLEANED UP useEffect: ONLY contains local style injections ---
    useEffect(() => {
        // Inject keyframes and hover hacks for loading indicator using a CSS approach
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .loading-indicator-inline {
                border: 4px solid #f0f0f0; 
                border-top: 4px solid #4caf50; 
                border-radius: 50%;
                width: 28px;
                height: 28px;
                animation: spin 1s linear infinite;
            }
            /* Global hover hacks for inline styles */
            .button-hover:hover { background-color: ${styles.darkerRedHover} !important; }
            .predict-hover:hover:not([disabled]) { background-color: ${styles.predictButtonHover} !important; }
        `;
        document.head.appendChild(styleEl);

        return () => {
            // Cleanup the injected style
            document.head.removeChild(styleEl);
        };
    }, []); 
    // --- END CLEANED UP useEffect ---


    const predictButtonStyle = isLoading || !selectedFile 
        ? {...styles.predictButton, ...styles.predictButtonDisabled}
        : styles.predictButton;
        
    const buttonStyle = styles.button;

    return (
        <div style={styles.gradientBg}>
            {/* Inject global font and background styles temporarily */}
            <style>{`
                body {
                    font-family: 'Roboto', sans-serif;
                    color: ${styles.textDark};
                    background-color: ${styles.primaryLightBg};
                    min-height: 100vh;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
            `}</style>
            
            <main style={styles.container}>
                <section style={styles.content}>
                    <h1 style={styles.title}>Leaf Disease Prediction 🌿</h1>
                    
                    <div style={styles.buttonContainer}>
                        <label 
                            htmlFor="imageUpload" 
                            className="button-hover" // Use class for hover hack
                            style={buttonStyle}
                        >
                            <i className="fas fa-image" style={styles.buttonIcon}></i>
                            <span style={styles.buttonText}>Upload Image</span>
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                ref={fileInputRef}
                            />
                        </label>
                        <button 
                            style={buttonStyle} 
                            onClick={handleCapturePhoto}
                            className="button-hover" // Use class for hover hack
                        >
                            <i className="fas fa-camera" style={styles.buttonIcon}></i>
                            <span style={styles.buttonText}>Capture Photo</span>
                        </button>
                    </div>

                    <div
                        style={{
                            ...styles.imagePreviewContainer,
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            color: styles.textMuted,
                            fontSize: '1.2em'
                        }}
                    >
                        {imagePreviewUrl ? (
                            <img
                                style={styles.imagePreview}
                                src={imagePreviewUrl}
                                alt="Selected Leaf"
                            />
                        ) : (
                            <>
                                <i className="fas fa-file-image" style={{fontSize: '3em', marginBottom: '10px', color: styles.textMuted}}></i>
                                <span>Preview of Selected Leaf</span>
                            </>
                        )}
                    </div>

                    <button
                        className={`predict-hover ${!selectedFile || isLoading ? 'disabled' : ''}`}
                        onClick={handlePredict}
                        disabled={!selectedFile || isLoading}
                        style={predictButtonStyle}
                    >
                        <div style={{ display: isLoading ? 'none' : 'flex', alignItems: 'center' }}>
                            <i className="fas fa-microscope" style={styles.buttonIcon}></i>
                            <span style={styles.predictButtonText}>Predict Disease</span>
                        </div>
                        {/* Use the class-based loading indicator */}
                        <div className="loading-indicator-inline" style={{ display: isLoading ? 'block' : 'none' }}></div>
                    </button>

                    {error && <p style={styles.errorText}>{error}</p>}

                    {result && (
                        <section style={styles.resultContainer}>
                            <h2 style={styles.resultTitle}>Prediction Result</h2>
                            <div style={styles.resultCard}>
                                <p style={styles.label}>Predicted Disease: <span style={styles.labelText}>{result.label}</span></p>
                                <p style={styles.label}>Confidence Score: <span style={styles.confidenceText}>{result.confidence}%</span></p>
                            </div>

                            <div>
                                {Object.entries(AccordionSections).map(([title, key]) => (
                                    result.details[key] && result.details[key].length > 0 && (
                                        <AccordionCard
                                            key={key}
                                            title={title}
                                            details={result.details[key]}
                                        />
                                    )
                                ))}
                            </div>
                        </section>
                    )}
                </section>
            </main>
        </div>
    );
};

export default LeafDiseaseDetection;