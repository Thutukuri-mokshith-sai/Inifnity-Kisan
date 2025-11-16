import React from "react";
import { Link } from "react-router-dom";
// Import Font Awesome icons for social media
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'; // Used Feather icons for contact details

function Footer() {
  // --- Custom Styles matching Sidebar Palette ---
  const footerStyle = {
    // Using the darker shade of the sidebar gradient for the footer background
    background: '#1a3409', 
    color: '#e8f5e9', // Light text color
    paddingTop: '50px',
    paddingBottom: '30px',
    marginTop: 'auto',
    // Stronger top border matching the sidebar theme
    borderTop: '5px solid #2d5016', 
    boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.25)',
  };

  const headingStyle = {
    color: '#a5d6a7', // Light green for main titles
    fontWeight: 'bold',
    marginBottom: '1rem',
    textTransform: 'uppercase',
  };
  
  const linkStyle = {
    color: '#fff', // White for links
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    fontSize: '0.9rem',
  };
  
  const linkHoverStyle = {
    color: '#a5d6a7', // Light green on hover
    textDecoration: 'underline',
  };
  
  const iconButtonStyle = {
    borderColor: '#a5d6a7',
    color: '#a5d6a7',
    backgroundColor: 'transparent',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  };

  const iconButtonHoverStyle = {
    backgroundColor: '#a5d6a7',
    color: '#1a3409', // Dark green text on light green background
  };
  
  // --- END Custom Styles ---

  // Component to handle link styles dynamically
  const ThemedLink = ({ to, children }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
      <Link 
        to={to} 
        style={{ ...linkStyle, ...(isHovered ? linkHoverStyle : {}) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </Link>
    );
  };

  // Component to handle social button styles dynamically
  const SocialButton = ({ Icon, href }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="me-2"
        style={{ ...iconButtonStyle, ...(isHovered ? iconButtonHoverStyle : {}) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={Icon.name.replace('Fa', '')}
      >
        <Icon size={18} />
      </a>
    );
  };


  return (
    // Applied custom footerStyle
    <footer style={footerStyle}>
      <div className="container">
        <div className="row">
          
          {/* 2. **Branding & Mission Statement (Column 1)** */}
          <div className="col-md-4 mb-5 mb-md-0">
            <h5 style={headingStyle}>Infinity Kisan</h5>
            <p className="small" style={{ color: '#c8e6c9' }}>
              Empowering farmers with smart technology for better yields and sustainable growth.
            </p>
            <div className="d-flex align-items-center small mt-3" style={{ color: '#fff' }}>
                <FiMapPin className="me-2" size={16} style={{ color: '#a5d6a7' }} />
                Hyderabad, India
            </div>
          </div>
          
          {/* 3. **Quick Links (Column 2)** */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <h6 style={headingStyle}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><ThemedLink to="/about">About Us</ThemedLink></li>
              <li className="mb-2"><ThemedLink to="/careers">Careers</ThemedLink></li>
              <li className="mb-2"><ThemedLink to="/faq">FAQ</ThemedLink></li>
              <li className="mb-2"><ThemedLink to="/contact">Contact</ThemedLink></li>
            </ul>
          </div>

          {/* 4. **Legal & Resources (Column 3)** */}
          <div className="col-6 col-md-2 mb-4 mb-md-0">
            <h6 style={headingStyle}>Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><ThemedLink to="/privacy">Privacy Policy</ThemedLink></li>
              <li className="mb-2"><ThemedLink to="/terms">Terms of Service</ThemedLink></li>
              <li className="mb-2"><ThemedLink to="/help">Support Center</ThemedLink></li>
              <li className="mb-2"><ThemedLink to="/press">Press</ThemedLink></li>
            </ul>
          </div>
          
          {/* 5. **Social Media & Contact (Column 4)** */}
          <div className="col-md-4">
            <h6 style={headingStyle}>Connect With Us</h6>
            <div className="d-flex mb-3">
                {/* Replaced placeholder text with SocialButton component using Fa icons */}
                <SocialButton Icon={FaFacebookF} href="https://facebook.com" />
                <SocialButton Icon={FaTwitter} href="https://twitter.com" />
                <SocialButton Icon={FaInstagram} href="https://instagram.com" />
                <SocialButton Icon={FaLinkedinIn} href="https://linkedin.com" />
            </div>
            <p className="small mb-1 d-flex align-items-center" style={{ color: '#fff' }}>
              <FiMail className="me-2" size={16} style={{ color: '#a5d6a7' }} /> Email: support@infinitykisan.com
            </p>
            <p className="small mb-1 d-flex align-items-center" style={{ color: '#fff' }}>
              <FiPhone className="me-2" size={16} style={{ color: '#a5d6a7' }} /> Phone: +91 123 456 7890
            </p>
          </div>
        </div>

        {/* 6. **Copyright Bar (Bottom)** */}
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <div className="text-center">
          <p className="mb-0 small" style={{ color: '#c8e6c9' }}>
            &copy; {new Date().getFullYear()} **Infinity Kisan** | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;