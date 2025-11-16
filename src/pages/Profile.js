import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import { Edit2, Save, X, User, Award, MapPin, Droplet } from 'lucide-react';

const styles = {
    profileContainer: {
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: '"Poppins", sans-serif',
    },
    header: {
        background: "linear-gradient(135deg, #8f2c24 0%, #b93d32 100%)",
        borderRadius: "20px",
        padding: "40px",
        marginBottom: "30px",
        color: "#fff",
        boxShadow: "0 10px 30px rgba(143, 44, 36, 0.3)",
    },
    headerTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "15px",
    },
    profileTitle: {
        fontSize: "2.5em",
        fontWeight: 700,
        margin: 0,
    },
    editButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 24px",
        fontSize: "1em",
        fontWeight: 600,
        color: "#8f2c24",
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    progressSection: {
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "15px",
        padding: "20px",
        backdropFilter: "blur(10px)",
    },
    progressHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
    },
    progressText: {
        fontSize: "1.1em",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    progressPercentage: {
        fontSize: "2em",
        fontWeight: 700,
    },
    progressBar: {
        width: "100%",
        height: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
    },
    progressFill: {
        height: "100%",
        background: "linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)",
        transition: "width 0.5s ease",
        borderRadius: "10px",
    },
    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "25px",
        marginBottom: "30px",
    },
    card: {
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        border: "2px solid #f5f5f5",
        transition: "all 0.3s ease",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "25px",
        paddingBottom: "15px",
        borderBottom: "2px solid #8f2c24",
    },
    cardIcon: {
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #8f2c24 0%, #b93d32 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    },
    cardTitle: {
        fontSize: "1.5em",
        fontWeight: 700,
        color: "#8f2c24",
        margin: 0,
    },
    infoGrid: {
        display: "grid",
        gap: "18px",
    },
    infoItem: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    infoLabel: {
        fontSize: "0.85em",
        fontWeight: 600,
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    infoValue: {
        fontSize: "1.1em",
        fontWeight: 500,
        color: "#333",
        padding: "12px 16px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: "10px",
        border: "1px solid #e0e0e0",
        minHeight: "45px",
        display: "flex",
        alignItems: "center",
    },
    input: {
        fontSize: "1em",
        fontWeight: 500,
        color: "#333",
        padding: "12px 16px",
        background: "#fff",
        borderRadius: "10px",
        border: "2px solid #8f2c24",
        outline: "none",
        transition: "all 0.3s ease",
    },
    select: {
        fontSize: "1em",
        fontWeight: 500,
        color: "#333",
        padding: "12px 16px",
        background: "#fff",
        borderRadius: "10px",
        border: "2px solid #8f2c24",
        outline: "none",
        cursor: "pointer",
    },
    textarea: {
        fontSize: "1em",
        fontWeight: 500,
        color: "#333",
        padding: "12px 16px",
        background: "#fff",
        borderRadius: "10px",
        border: "2px solid #8f2c24",
        outline: "none",
        resize: "vertical",
        minHeight: "100px",
        fontFamily: "inherit",
    },
    checkbox: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: "10px",
        border: "1px solid #e0e0e0",
        cursor: "pointer",
    },
    saveButton: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "18px 32px",
        fontSize: "1.2em",
        fontWeight: 700,
        color: "#fff",
        background: "linear-gradient(135deg, #8f2c24 0%, #b93d32 100%)",
        border: "none",
        borderRadius: "15px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 6px 20px rgba(143, 44, 36, 0.3)",
    },
    statusMessage: {
        padding: "16px 24px",
        borderRadius: "12px",
        fontSize: "1em",
        fontWeight: 600,
        textAlign: "center",
        marginTop: "20px",
    },
    loading: {
        textAlign: "center",
        fontSize: "1.3em",
        color: "#8f2c24",
        padding: "60px",
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "0.85em",
        fontWeight: 600,
        background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)",
        color: "#fff",
    },
    achievementBadge: {
        position: "absolute",
        top: "15px",
        right: "15px",
        background: "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "0.9em",
        fontWeight: 700,
        boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
    }
};

const API_BASE_URL = "http://localhost:5000/api/profile";
const PROFILE_STORAGE_KEY = "userProfileData";

function Profile() {
    const { user, token } = useContext(AuthContext);
    const userId = user?.id;

    const [profileData, setProfileData] = useState({
        fullName: '', gender: '', profilePhoto: '', dateOfBirth: '', phoneNumber: '',
        educationLevel: '', householdSize: 0, farmGroupMembership: false, landOwnershipType: '',
        farmSize: 0, farmSizeUnit: 'acres', numberOfPlots: 0,
        mainLocationVillage: '', mainLocationDistrict: '', gpsLocation: '',
        irrigationAccess: 'none', mainSoilType: '', landSlope: 'flat', previousCropsGrown: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [isExistingProfile, setIsExistingProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Helper function to get profile key with userId
    const getProfileStorageKey = () => {
        return userId ? `${PROFILE_STORAGE_KEY}_${userId}` : PROFILE_STORAGE_KEY;
    };

    // Save profile data to localStorage
    const saveToLocalStorage = (data) => {
        try {
            const storageKey = getProfileStorageKey();
            localStorage.setItem(storageKey, JSON.stringify({
                data: data,
                timestamp: new Date().toISOString(),
                userId: userId
            }));
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    };

    // Load profile data from localStorage
    const loadFromLocalStorage = () => {
        try {
            const storageKey = getProfileStorageKey();
            const storedData = localStorage.getItem(storageKey);
            if (storedData) {
                const parsed = JSON.parse(storedData);
                // Check if the stored data is for the current user
                if (parsed.userId === userId) {
                    return parsed.data;
                }
            }
        } catch (error) {
            console.error("Error loading from localStorage:", error);
        }
        return null;
    };

    // Clear profile data from localStorage
    const clearLocalStorage = () => {
        try {
            const storageKey = getProfileStorageKey();
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error("Error clearing localStorage:", error);
        }
    };

    // Calculate profile completion percentage
    const calculateCompletion = () => {
        const fields = [
            'fullName', 'gender', 'dateOfBirth', 'phoneNumber', 'householdSize',
            'landOwnershipType', 'farmSize', 'numberOfPlots', 'mainLocationVillage',
            'mainLocationDistrict', 'irrigationAccess', 'mainSoilType', 'landSlope'
        ];
        
        const filledFields = fields.filter(field => {
            const value = profileData[field];
            return value !== '' && value !== 0 && value !== null && value !== undefined;
        }).length;
        
        return Math.round((filledFields / fields.length) * 100);
    };

    const completionPercentage = calculateCompletion();

    // Get achievement level based on completion
    const getAchievementLevel = (percentage) => {
        if (percentage >= 100) return { text: "🏆 Profile Master", color: "#FFD700" };
        if (percentage >= 75) return { text: "⭐ Almost There", color: "#4CAF50" };
        if (percentage >= 50) return { text: "📈 Good Progress", color: "#FF9800" };
        if (percentage >= 25) return { text: "🌱 Getting Started", color: "#2196F3" };
        return { text: "🎯 Begin Journey", color: "#9E9E9E" };
    };

    const achievement = getAchievementLevel(completionPercentage);

    useEffect(() => {
        if (!userId || !token) {
            setIsLoading(false);
            return;
        }

        const fetchProfile = async () => {
            // First, try to load from localStorage
            const cachedData = loadFromLocalStorage();
            if (cachedData) {
                setProfileData(prev => ({
                    ...prev,
                    ...cachedData,
                    dateOfBirth: cachedData.dateOfBirth ? cachedData.dateOfBirth.substring(0, 10) : ''
                }));
                setIsExistingProfile(true);
            }

            // Then fetch from server to get the latest data
            try {
                const response = await axios.get(`${API_BASE_URL}/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const profileKeys = response.data.profile || response.data;

                if (!profileKeys || typeof profileKeys !== 'object') {
                    throw new Error("Invalid profile data structure received from server.");
                }

                const formattedData = {
                    ...profileKeys,
                    dateOfBirth: profileKeys.dateOfBirth ? profileKeys.dateOfBirth.substring(0, 10) : ''
                };

                setProfileData(prev => ({
                    ...prev,
                    ...formattedData
                }));
                
                // Save the fresh data to localStorage
                saveToLocalStorage(formattedData);
                
                setIsExistingProfile(true);
                setStatus('');

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // No profile found on server
                    if (!cachedData) {
                        // No cached data either, so it's a new profile
                        setIsExistingProfile(false);
                        setIsEditing(true);
                        clearLocalStorage();
                    }
                    setStatus('');
                } else {
                    console.error("Error fetching profile:", error.response?.data || error);
                    // If we have cached data, we can still show it
                    if (!cachedData) {
                        setStatus(`Error fetching profile: ${error.response?.data?.error || error.message}`);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId, token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !token) {
            setStatus("Authentication required to save profile.");
            return;
        }
        
        setStatus('Saving profile...');
        const method = isExistingProfile ? 'put' : 'post';
        const url = isExistingProfile ? `${API_BASE_URL}/${userId}` : `${API_BASE_URL}`;
        
        try {
            const dataToSubmit = isExistingProfile
                ? profileData
                : { ...profileData, userId };

            const response = await axios({
                method: method,
                url: url,
                headers: { Authorization: `Bearer ${token}` },
                data: dataToSubmit
            });

            // Save the updated data to localStorage
            const savedData = response.data.profile || response.data;
            saveToLocalStorage({
                ...profileData,
                ...savedData
            });

            setIsExistingProfile(true);
            setIsEditing(false);
            setStatus(`✅ Profile ${isExistingProfile ? 'updated' : 'created'} successfully!`);

        } catch (error) {
            console.error("Error saving profile:", error.response?.data || error);
            setStatus(`❌ Error saving profile: ${error.response?.data?.error || error.message}`);
        }
    };

    // Add a refresh handler if you want a manual refresh button
    const handleRefresh = async () => {
        if (!userId || !token) return;
        
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const profileKeys = response.data.profile || response.data;
            const formattedData = {
                ...profileKeys,
                dateOfBirth: profileKeys.dateOfBirth ? profileKeys.dateOfBirth.substring(0, 10) : ''
            };

            setProfileData(prev => ({
                ...prev,
                ...formattedData
            }));
            
            saveToLocalStorage(formattedData);
            setStatus('✅ Profile refreshed successfully!');
            
        } catch (error) {
            console.error("Error refreshing profile:", error);
            setStatus(`❌ Error refreshing profile: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div style={styles.profileContainer}>
                <div style={styles.loading}>Loading profile data...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={styles.profileContainer}>
                <div style={{ ...styles.loading, color: 'red' }}>Please log in to view your profile.</div>
            </div>
        );
    }

    return (
        <div style={styles.profileContainer}>
            {/* Header with Gamification Progress */}
            <div style={styles.header}>
                <div style={styles.headerTop}>
                    <h1 style={styles.profileTitle}>My Profile</h1>
                    <button
                        style={styles.editButton}
                        onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                        type="button"
                    >
                        {isEditing ? <><X size={20} /> Cancel</> : <><Edit2 size={20} /> Edit Profile</>}
                    </button>
                </div>

                {/* Gamification: Progress Bar with Achievement */}
                <div style={styles.progressSection}>
                    <div style={styles.progressHeader}>
                        <div style={styles.progressText}>
                            <Award size={24} />
                            <span>Profile Completion</span>
                            <span style={{
                                background: achievement.color,
                                color: "#fff",
                                padding: "4px 12px",
                                borderRadius: "12px",
                                fontSize: "0.85em",
                                marginLeft: "10px"
                            }}>
                                {achievement.text}
                            </span>
                        </div>
                        <div style={styles.progressPercentage}>{completionPercentage}%</div>
                    </div>
                    <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${completionPercentage}%` }} />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={styles.cardsGrid}>
                    {/* Personal Details Card */}
                    <div style={{ ...styles.card, position: 'relative' }}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardIcon}>
                                <User size={24} />
                            </div>
                            <h2 style={styles.cardTitle}>Personal Details</h2>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Full Name</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="text"
                                        name="fullName"
                                        value={profileData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>{profileData.fullName || '—'}</div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Gender</label>
                                {isEditing ? (
                                    <select style={styles.select} name="gender" value={profileData.gender} onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <div style={styles.infoValue}>{profileData.gender || '—'}</div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Date of Birth</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="date"
                                        name="dateOfBirth"
                                        value={profileData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString('en-GB') : '—'}
                                    </div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Phone Number</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="tel"
                                        name="phoneNumber"
                                        value={profileData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+91 XXXXXXXXXX"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>{profileData.phoneNumber || '—'}</div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Household Size</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="number"
                                        name="householdSize"
                                        value={profileData.householdSize}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.householdSize ? `${profileData.householdSize} members` : '—'}
                                    </div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Land Ownership</label>
                                {isEditing ? (
                                    <select style={styles.select} name="landOwnershipType" value={profileData.landOwnershipType} onChange={handleChange}>
                                        <option value="">Select Type</option>
                                        <option value="owned">Owned</option>
                                        <option value="rented">Rented</option>
                                        <option value="communal">Communal</option>
                                    </select>
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.landOwnershipType ? 
                                            profileData.landOwnershipType.charAt(0).toUpperCase() + profileData.landOwnershipType.slice(1) 
                                            : '—'
                                        }
                                    </div>
                                )}
                            </div>

                            <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                                <label style={styles.infoLabel}>Farm Group Membership</label>
                                {isEditing ? (
                                    <div style={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            name="farmGroupMembership"
                                            checked={profileData.farmGroupMembership}
                                            onChange={handleChange}
                                        />
                                        <span>Member of farm group/cooperative</span>
                                    </div>
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.farmGroupMembership ? (
                                            <span style={styles.badge}>✓ Member</span>
                                        ) : (
                                            'Not a member'
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Farm Location Card */}
                    <div style={{ ...styles.card, position: 'relative' }}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardIcon}>
                                <MapPin size={24} />
                            </div>
                            <h2 style={styles.cardTitle}>Farm Location</h2>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Farm Size</label>
                                {isEditing ? (
                                    <>
                                        <input
                                            style={styles.input}
                                            type="number"
                                            step="0.1"
                                            name="farmSize"
                                            value={profileData.farmSize}
                                            onChange={handleChange}
                                            min="0"
                                        />
                                        <select
                                            style={{ ...styles.select, marginTop: '8px' }}
                                            name="farmSizeUnit"
                                            value={profileData.farmSizeUnit}
                                            onChange={handleChange}
                                        >
                                            <option value="acres">Acres</option>
                                            <option value="hectares">Hectares</option>
                                        </select>
                                    </>
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.farmSize ? `${profileData.farmSize} ${profileData.farmSizeUnit}` : '—'}
                                    </div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Number of Plots</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="number"
                                        name="numberOfPlots"
                                        value={profileData.numberOfPlots}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.numberOfPlots ? `${profileData.numberOfPlots} plots` : '—'}
                                    </div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Village/Town</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="text"
                                        name="mainLocationVillage"
                                        value={profileData.mainLocationVillage}
                                        onChange={handleChange}
                                        placeholder="Enter village or town"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>{profileData.mainLocationVillage || '—'}</div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>District</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        type="text"
                                        name="mainLocationDistrict"
                                        value={profileData.mainLocationDistrict}
                                        onChange={handleChange}
                                        placeholder="Enter district"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>{profileData.mainLocationDistrict || '—'}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Farm Conditions Card */}
                    <div style={{ ...styles.card, position: 'relative' }}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardIcon}>
                                <Droplet size={24} />
                            </div>
                            <h2 style={styles.cardTitle}>Farm Conditions</h2>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Irrigation Access</label>
                                {isEditing ? (
                                    <select style={styles.select} name="irrigationAccess" value={profileData.irrigationAccess} onChange={handleChange}>
                                        <option value="none">None</option>
                                        <option value="partial">Partial</option>
                                        <option value="full">Full</option>
                                    </select>
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.irrigationAccess ? 
                                            profileData.irrigationAccess.charAt(0).toUpperCase() + profileData.irrigationAccess.slice(1)
                                            : '—'
                                        }
                                    </div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Main Soil Type</label>
                                {isEditing ? (
                                    <select style={styles.select} name="mainSoilType" value={profileData.mainSoilType} onChange={handleChange}>
                                        <option value="">Select Type</option>
                                        <option value="sandy">Sandy</option>
                                        <option value="clay">Clay</option>
                                        <option value="loam">Loam</option>
                                        <option value="other">Other</option>
                                    </select>
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.mainSoilType ? 
                                            profileData.mainSoilType.charAt(0).toUpperCase() + profileData.mainSoilType.slice(1)
                                            : '—'
                                        }
                                    </div>
                                )}
                            </div>

                            <div style={styles.infoItem}>
                                <label style={styles.infoLabel}>Land Slope</label>
                                {isEditing ? (
                                    <select style={styles.select} name="landSlope" value={profileData.landSlope} onChange={handleChange}>
                                        <option value="flat">Flat</option>
                                        <option value="gentle">Gentle</option>
                                        <option value="steep">Steep</option>
                                    </select>
                                ) : (
                                    <div style={styles.infoValue}>
                                        {profileData.landSlope ? 
                                            profileData.landSlope.charAt(0).toUpperCase() + profileData.landSlope.slice(1)
                                            : '—'
                                        }
                                    </div>
                                )}
                            </div>

                            <div style={{ ...styles.infoItem, gridColumn: '1 / -1' }}>
                                <label style={styles.infoLabel}>Previous Crops Grown</label>
                                {isEditing ? (
                                    <textarea
                                        style={styles.textarea}
                                        name="previousCropsGrown"
                                        value={profileData.previousCropsGrown}
                                        onChange={handleChange}
                                        placeholder="Enter crops separated by commas (e.g., Rice, Wheat, Cotton)"
                                    />
                                ) : (
                                    <div style={styles.infoValue}>{profileData.previousCropsGrown || '—'}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button - Only show when editing */}
                {isEditing && (
                    <button style={styles.saveButton} type="submit">
                        <Save size={24} />
                        {isExistingProfile ? 'Save Changes' : 'Create Profile'}
                    </button>
                )}
            </form>

            {/* Status Message */}
            {status && (
                <div style={{
                    ...styles.statusMessage,
                    background: status.includes('Error') || status.includes('Authentication')
                        ? 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)'
                        : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                    color: status.includes('Error') || status.includes('Authentication')
                        ? '#c62828'
                        : '#2e7d32',
                    border: `2px solid ${status.includes('Error') || status.includes('Authentication')
                        ? '#ef5350'
                        : '#4CAF50'}`
                }}>
                    {status}
                </div>
            )}
        </div>
    );
}

export default Profile;