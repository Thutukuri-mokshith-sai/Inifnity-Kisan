import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Import icons
import { 
  FiHome, 
  FiTrello, 
  FiCloud, 
  FiTrendingUp, 
  FiBarChart2, 
  FiUser, 
  FiBell, 
  FiLogOut, 
  FiSettings, 
  FiPackage, 
  FiSearch,
  FiUserPlus, 
  FiLogIn 
} from 'react-icons/fi';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  // --- Custom Styles using Sidebar Palette ---
  const headerStyle = {
    // Matching the sidebar's gradient
    background: 'linear-gradient(90deg, #2d5016 0%, #1a3409 100%)', 
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Stronger shadow for header
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  };

  const linkStyle = {
    color: '#e8f5e9', // Light green/off-white text for contrast
    transition: 'color 0.3s ease',
  };

  const hoverLinkStyle = {
    color: '#a5d6a7', // Lighter green on hover
  };
  
  const buttonOutlineStyle = {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
  };
  
  const buttonHoverStyle = {
    borderColor: '#a5d6a7',
    color: '#1a3409',
    backgroundColor: '#a5d6a7',
  };
  
  const buttonSolidStyle = {
    backgroundColor: '#fff',
    color: '#1a3409', // Dark text on light button
    fontWeight: 'bold',
  };
  // --- END Custom Styles ---

  const [isHoveringHome, setIsHoveringHome] = React.useState(false);
  const [isHoveringFields, setIsHoveringFields] = React.useState(false);
  const [isHoveringWeather, setIsHoveringWeather] = React.useState(false);
  const [isHoveringMarket, setIsHoveringMarket] = React.useState(false);
  const [isHoveringReports, setIsHoveringReports] = React.useState(false);


  return (
    // Applied custom headerStyle and removed 'bg-success'
    <nav className="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top" style={headerStyle}>
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/" style={linkStyle}>
          <span className="me-2" style={{ display: 'flex', alignItems: 'center' }}>
            <FiPackage size={24} /> 
          </span>
          Infinity Kisan
        </Link>

        {/* Toggler for mobile view (Kept default Bootstrap Toggler for simplicity) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAgritech"
          aria-controls="navbarNavAgritech"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAgritech">
          {/* Main nav links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className="nav-link active d-flex align-items-center" 
                to="/" 
                style={{ ...linkStyle, ...(isHoveringHome ? hoverLinkStyle : {}), fontWeight: '600' }}
                onMouseEnter={() => setIsHoveringHome(true)}
                onMouseLeave={() => setIsHoveringHome(false)}
              >
                <FiHome className="me-1" /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link 
                className="nav-link d-flex align-items-center" 
                to="/fields"
                style={{ ...linkStyle, ...(isHoveringFields ? hoverLinkStyle : {}) }}
                onMouseEnter={() => setIsHoveringFields(true)}
                onMouseLeave={() => setIsHoveringFields(false)}
              >
                <FiTrello className="me-1" /> Farm Fields
              </Link> */}
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link d-flex align-items-center" 
                to="/AICropPlanner"
                style={{ ...linkStyle, ...(isHoveringWeather ? hoverLinkStyle : {}) }}
                onMouseEnter={() => setIsHoveringWeather(true)}
                onMouseLeave={() => setIsHoveringWeather(false)}
              >
                <FiCloud className="me-1" /> AICropPlanner
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link d-flex align-items-center" 
                to="/Chatbot"
                style={{ ...linkStyle, ...(isHoveringMarket ? hoverLinkStyle : {}) }}
                onMouseEnter={() => setIsHoveringMarket(true)}
                onMouseLeave={() => setIsHoveringMarket(false)}
              >
                <FiTrendingUp className="me-1" /> Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link d-flex align-items-center" 
                to="/YieldPrediction"
                style={{ ...linkStyle, ...(isHoveringReports ? hoverLinkStyle : {}) }}
                onMouseEnter={() => setIsHoveringReports(true)}
                onMouseLeave={() => setIsHoveringReports(false)}
              >
                <FiBarChart2 className="me-1" /> YieldPrediction Reports
              </Link>
            </li>
          </ul>

          {/* Right side utilities */}
          <div className="d-flex align-items-center ms-auto">

            {/* Search bar */}
            <form className="d-none d-lg-flex me-3 position-relative" role="search">
              {/* Customizing search input for dark background */}
              <input
                className="form-control ps-4" 
                type="search"
                placeholder="Search Crops/Fields..."
                aria-label="Search"
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#fff' }}
              />
              <FiSearch className="position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#a5d6a7' }} />
            </form>

            {/* Notification bell */}
            <button
              className="btn position-relative"
              title="Notifications"
              style={buttonOutlineStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonOutlineStyle)}
            >
              <FiBell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>

            {/* Auth Section */}
            {!user ? (
              <>
                {/* Login button */}
                <Link 
                  to="/login" 
                  className="btn me-2 d-flex align-items-center" 
                  style={buttonOutlineStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonOutlineStyle)}
                >
                  <FiLogIn className="me-1" /> Login
                </Link>
                {/* Signup button */}
                <Link 
                  to="/signup" 
                  className="btn fw-bold d-flex align-items-center" 
                  style={buttonSolidStyle}
                >
                  <FiUserPlus className="me-1" /> Signup
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle rounded-circle p-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title={`User: ${user.email || 'Profile'}`}
                  // Customizing the profile button to match the theme
                  style={{ width: "40px", height: "40px", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#a5d6a7', color: '#1a3409' }}
                >
                  <FiUser size={24} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/profile">
                      <FiUser size={16} className="me-2" /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/settings">
                      <FiSettings size={16} className="me-2" /> Settings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger d-flex align-items-center" onClick={handleLogout}>
                      <FiLogOut size={16} className="me-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;