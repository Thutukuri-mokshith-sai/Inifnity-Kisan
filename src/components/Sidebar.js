import React, { useState } from "react";

import { Link } from "react-router-dom";

// 1. Import the specific icons from react-icons/fi and react-icons/fa
import { 
  FiHome, 
  FiSettings, 
  FiLogOut, 
  FiArrowLeftCircle, // For the toggle button
  FiArrowRightCircle, // For the toggle button
  FiBarChart2, 
  FiDroplet, // Representing Crop/Field
  FiTrello, // Representing Farm Management/Fields
  FiCloud, // Representing Weather
  FiTrendingUp, // Representing Market Prices/Forecasting
} from 'react-icons/fi';
import { FaMicroscope } from "react-icons/fa";

/**
 * NavItem component for sidebar links.
 * Accepts the React Icon component directly as a prop.
 */
const NavItem = ({ to, Icon, label, isOpen, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    marginBottom: '8px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    // Dark Red/Maroon theme for active state
    background: isActive
      ? 'linear-gradient(135deg, #8f2c24 0%, #6d1f1a 100%)'
      : isHovered
        ? 'rgba(255, 255, 255, 0.12)'
        : 'transparent',
    transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
    boxShadow: isActive ? '0 4px 12px rgba(143, 44, 36, 0.4)' : 'none',
  };

  const iconStyle = {
    fontSize: '1.5em',
    minWidth: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' : 'none',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
  };

  const labelStyle = {
    fontSize: '1em',
    fontWeight: isActive ? 600 : 400,
    marginLeft: '12px',
    whiteSpace: 'nowrap',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.3s ease',
    letterSpacing: '0.3px',
  };

  const activeIndicatorStyle = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '70%',
    background: '#fff',
    borderRadius: '0 4px 4px 0',
    opacity: isActive ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  return (
    <Link
      to={to}
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      title={isOpen ? "" : label} // Tooltip for collapsed state
    >
      <div style={activeIndicatorStyle} />
      {/* Render the Icon component directly */}
      <span style={iconStyle}>
        <Icon />
      </span>
      {isOpen && <span style={labelStyle}>{label}</span>}
    </Link>
  );
};

// ---
// Sidebar Component
// ---

function Sidebar() {
  // ✅ MODIFICATION: Sidebar initializes in the collapsed state.
  const [isOpen, setIsOpen] = useState(false); 
  const [activeItem, setActiveItem] = useState("/");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // --- Styles ---

  const sidebarStyle = {
    // Width is controlled by the isOpen state
    width: isOpen ? '280px' : '85px', 
    minHeight: '100vh',
    // Green/Forest theme for the sidebar background
    background: 'linear-gradient(180deg, #2d5016 0%, #1a3409 100%)', 
    position: 'sticky',
    top: 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column', // Essential for flex: 1 on navContainerStyle
    padding: '24px 16px',
    zIndex: 100,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  };

  const titleStyle = {
    fontSize: '1.5em',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    // Gradient text for the title
    background: 'linear-gradient(135deg, #fff 0%, #c8e6c9 100%)', 
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.5px',
  };

  const toggleButtonStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    padding: '10px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '1.2em',
    transition: 'all 0.3s ease',
    minWidth: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const navContainerStyle = {
    flex: 1, // Crucial: Takes up all available vertical space
    overflowY: 'auto', // Crucial: Enables scrolling only within this container
    overflowX: 'hidden',
  };

  const sectionTitleStyle = {
    fontSize: '0.75em',
    fontWeight: 600,
    color: '#a5d6a7',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginTop: '32px',
    marginBottom: '12px',
    marginLeft: '12px',
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  const footerStyle = {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '2px solid rgba(255, 255, 255, 0.1)',
  };

  // --- END Styles ---


  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={headerStyle}>
        {/* The Title element for the sidebar. Only visible when expanded. */}
        {isOpen && <h5 style={titleStyle}> 🌱</h5>}
        
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={toggleButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={isOpen ? "Collapse Menu" : "Expand Menu"}
        >
          {/* Toggle button icon correctly reflects the state */}
          {isOpen ? <FiArrowLeftCircle size={24} /> : <FiArrowRightCircle size={24} />}
        </button>
      </div>

      {/* Navigation - Main Links (This container is now scrollable) */}
      <div style={navContainerStyle}>
        {/* Section titles are hidden if sidebar is closed */}
        <div style={sectionTitleStyle}>Main</div>
        <NavItem
          to="/"
          Icon={FiHome} 
          label="Dashboard"
          isOpen={isOpen}
          isActive={activeItem === "/"}
          onClick={() => setActiveItem("/")}
        />
        <NavItem
          to="/CropRecommendation"
          Icon={FiDroplet} 
          label="Crop Recommendation"
          isOpen={isOpen}
          isActive={activeItem === "/CropRecommendation"}
          onClick={() => setActiveItem("/CropRecommendation")}
        />
        <NavItem
          to="/LeafDiseaseDetection"
          Icon={FaMicroscope} // Using FaMicroscope from react-icons/fa
          label="Disease Detection"
          isOpen={isOpen}
          isActive={activeItem === "/LeafDiseaseDetection"}
          onClick={() => setActiveItem("/LeafDiseaseDetection")}
        />

        {/* Navigation - Farm Management Links */}
        {/* <div style={sectionTitleStyle}>Farm Management</div>
        <NavItem
          to="/fields"
          Icon={FiTrello} 
          label="Farm Fields"
          isOpen={isOpen}
          isActive={activeItem === "/fields"}
          onClick={() => setActiveItem("/fields")}
        />
        <NavItem
          to="/weather"
          Icon={FiCloud} 
          label="Weather Forecast"
          isOpen={isOpen}
          isActive={activeItem === "/weather"}
          onClick={() => setActiveItem("/weather")}
        />
        <NavItem
          to="/reports"
          Icon={FiBarChart2} 
          label="Analytics & Reports"
          isOpen={isOpen}
          isActive={activeItem === "/reports"}
          onClick={() => setActiveItem("/reports")}
        />
        
        {/* Market Insights Links */}
        <div style={sectionTitleStyle}>Market Insights</div>
        <NavItem
          to="/DailyMarketPrices" 
          Icon={FiTrendingUp} 
          label="Daily Market Prices"
          isOpen={isOpen}
          isActive={activeItem === "/DailyMarketPrices"} 
          onClick={() => setActiveItem("/DailyMarketPrices")} 
        />
        <NavItem
          to="/MarketPriceForecasting" 
          Icon={FiTrendingUp} 
          label="Price Forecasting"
          isOpen={isOpen}
          isActive={activeItem === "/MarketPriceForecasting"} 
          onClick={() => setActiveItem("/MarketPriceForecasting")} 
        /> */}
        {/* Added extra items here to demonstrate scrolling if needed. */}
        {/* For testing scroll functionality: */}
        {/* <NavItem to="/test1" Icon={FiBarChart2} label="Test Link 1" isOpen={isOpen} isActive={activeItem === "/test1"} onClick={() => setActiveItem("/test1")} />
        <NavItem to="/test2" Icon={FiBarChart2} label="Test Link 2" isOpen={isOpen} isActive={activeItem === "/test2"} onClick={() => setActiveItem("/test2")} />
        <NavItem to="/test3" Icon={FiBarChart2} label="Test Link 3" isOpen={isOpen} isActive={activeItem === "/test3"} onClick={() => setActiveItem("/test3")} />
        <NavItem to="/test4" Icon={FiBarChart2} label="Test Link 4" isOpen={isOpen} isActive={activeItem === "/test4"} onClick={() => setActiveItem("/test4")} /> */}
        
      </div>

      {/* Footer - Utility Links */}
      <div style={footerStyle}>
        <NavItem
          to="/settings"
          Icon={FiSettings} 
          label="Settings"
          isOpen={isOpen}
          isActive={activeItem === "/settings"}
          onClick={() => setActiveItem("/settings")}
        />
        <NavItem
          to="/logout"
          Icon={FiLogOut} 
          label="Logout"
          isOpen={isOpen}
          isActive={activeItem === "/logout"}
          onClick={() => setActiveItem("/logout")}
        />
      </div>
    </div>
  );
}

export default Sidebar;