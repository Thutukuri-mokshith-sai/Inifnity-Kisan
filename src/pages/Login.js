import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Assuming you have these files set up in your project
import api from "../api";
import { AuthContext } from "../context/AuthContext";

// --- START: Inline CSS Styles as JS Objects ---

const styles = {
  // Global Reset
  global: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily: '"Poppins", sans-serif',
  },
  // Section (Full screen container)
  section: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    // Note: The global font family is not applied here, typically it's body or global *
    // For this example, it's fine since it's applied inside the components.
  },
  // Background Image
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
  // Trees Image
  trees: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 100,
    pointerEvents: "none",
  },
  // Girl Image (CSS animation handled via a class in a separate stylesheet or a more complex hook)
  // For simplicity, we'll keep the static style here, note on the animation below.
  girl: {
    position: "absolute",
    // scale: 0.65, // 'scale' property in React style object is not widely supported, use transform
    transform: 'scale(0.65)',
    pointerEvents: "none",
    // animation: "animateGirl 10s linear infinite", // Must be external CSS or use a library
  },
  // Login Box (The Glassmorphism part)
  login: {
    position: "relative",
    padding: "60px",
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(15px)",
    border: "1px solid #fff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
    borderRight: "1px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "20px",
    width: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
    zIndex: 10, // Ensure it's above the background images
  },
  // Login Title
  loginH2: {
    position: "relative",
    width: "100%",
    textAlign: "center",
    fontSize: "2.5em",
    fontWeight: 600,
    color: "#8f2c24",
    marginBottom: "10px",
  },
  // Input Box Container
  inputBox: {
    position: "relative",
  },
  // Input Field
  input: {
    position: "relative",
    width: "100%",
    padding: "15px 20px",
    outline: "none",
    fontSize: "1.25em",
    color: "#8f2c24",
    borderRadius: "5px",
    background: "#fff",
    border: "none",
    marginBottom: "30px",
  },
  // Submit Button
  button: {
    position: "relative",
    border: "none",
    outline: "none",
    background: "#8f2c24",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1.25em",
    fontWeight: 500,
    transition: "0.5s",
    padding: "15px 20px", // Added padding to match input field
    borderRadius: "5px", // Added border-radius to match input field
    width: "100%", // Added width to match input field
    // Note: :hover style must be handled via a CSS module or a separate library/hook
  },
  // Group (Forget Password/Signup)
  group: {
    display: "flex",
    justifyContent: "space-between",
  },
  // Anchor tags
  anchor: {
    fontSize: "1.25em",
    color: "#8f2c24",
    fontWeight: 500,
    textDecoration: "none",
  },
  // Signup link special style
  anchorSignup: {
    fontSize: "1.25em",
    color: "#8f2c24",
    fontWeight: 500,
    textDecoration: "underline",
  },
  // Leaves (CSS animation not included in inline styles)
  leaves: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    pointerEvents: "none",
  },
  set: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  leafDiv: {
    position: "absolute",
    display: "block",
    // Note: The nth-child and @keyframes animations need external CSS for a full match.
  }
};

// --- END: Inline CSS Styles as JS Objects ---

function Login() {
  // Use 'email' instead of 'username' to align with the provided API logic
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  // NOTE: The placeholder text for the first input is "Username" in the original
  // HTML, but the backend uses "email". I will use "Email" in the placeholder 
  // and bind it to the `email` state for functionality.

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      // API call using state values
      const res = await api.post("/auth/login", { email, password });
      
      // Update AuthContext
      login(res.data.token);
      
      setMessage("Login successful!");
      // Navigate on success
      navigate("/profile");
    } catch (err) {
      // Display error message
      setMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };
  
  // Function to navigate to the signup page
  const handleSignupNavigation = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/signup");
  };

  return (
    // You would typically apply the global styles to the body/root element 
    // or use a separate CSS file. Here, we apply the section style.
    <section style={styles.section}>
      
      {/* Leaves Animation Container (CSS animations would need a separate stylesheet) */}
      <div className="leaves" style={styles.leaves}>
        <div className="set" style={styles.set}>
          {/* Note: The image source is 'leaf_0x.png', which must be in your public folder or imported */}
          <div style={{...styles.leafDiv, left: '20%', animation: 'animate 20s linear infinite'}}><img src="leaf_01.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '50%', animation: 'animate 14s linear infinite'}}><img src="leaf_02.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '70%', animation: 'animate 12s linear infinite'}}><img src="leaf_03.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '5%', animation: 'animate 15s linear infinite'}}><img src="leaf_04.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '85%', animation: 'animate 18s linear infinite'}}><img src="leaf_01.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '90%', animation: 'animate 12s linear infinite'}}><img src="leaf_02.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '15%', animation: 'animate 14s linear infinite'}}><img src="leaf_03.png" alt="Leaf" /></div>
          <div style={{...styles.leafDiv, left: '60%', animation: 'animate 15s linear infinite'}}><img src="leaf_04.png" alt="Leaf" /></div>
        </div>
      </div>
      
      {/* Background images (Source must be valid) */}
      <img src="bg.jpg" style={styles.bg} alt="Background" />
      {/* The 'girl' animation class must be defined in a CSS file */}
      <img src="girl.png" className="girl" style={styles.girl} alt="Girl" />
      <img src="trees.png" style={styles.trees} alt="Trees" />
      
      {/* Login Form (The Glassmorphism Box) */}
      <div className="login" style={styles.login}>
        <h2 style={styles.loginH2}>Sign In</h2>
        
        {/* Display message */}
        {message && <p style={{ color: message.includes("successful") ? 'green' : '#8f2c24', textAlign: 'center' }}>{message}</p>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          
          {/* Username/Email Input */}
          <div className="inputBox" style={styles.inputBox}>
            <input 
              type="text" 
              placeholder="Email" // Changed to Email to match logic
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input} 
            />
          </div>
          
          {/* Password Input */}
          <div className="inputBox" style={styles.inputBox}>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input} 
            />
          </div>
          
          {/* Login Button */}
          <div className="inputBox" style={styles.inputBox}>
            <input 
              type="submit" 
              value="Login" 
              id="btn" 
              style={styles.button}
            />
          </div>
          
          {/* Group Links */}
          <div className="group" style={styles.group}>
            {/* Navigates to /signup using React Router */}
            <a href="/signup" onClick={handleSignupNavigation} style={styles.anchorSignup}>Signup</a>
          </div>
          
        </form>
      </div>
    </section>
  );
}

export default Login;