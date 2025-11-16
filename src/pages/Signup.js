import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming you have this file set up in your project
import api from "../api"; 

// --- START: Inline CSS Styles as JS Objects ---

const styles = {
  // Section (Full screen container)
  section: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    fontFamily: '"Poppins", sans-serif', // Added font-family here for container
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
  girl: {
    position: "absolute",
    transform: 'scale(0.65)',
    pointerEvents: "none",
    // className="girl" must be used for animation
  },
  // Signup Box (The Glassmorphism part)
  signup: { // Renamed from 'login' to 'signup' for clarity
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
    zIndex: 10,
  },
  // Signup Title
  signupH2: {
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
    padding: "15px 20px",
    borderRadius: "5px",
    width: "100%",
  },
  // Group (Login Link)
  group: {
    display: "flex",
    justifyContent: "center", // Centered for just one link
  },
  // Anchor tag
  anchor: {
    fontSize: "1.25em",
    color: "#8f2c24",
    fontWeight: 500,
    textDecoration: "underline",
  },
  // Leaves (CSS animation container)
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
    // nth-child/keyframes need external CSS
  }
};

// --- END: Inline CSS Styles as JS Objects ---

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      const res = await api.post("/auth/signup", { email, password });
      
      // Navigate to login on success
      setMessage(res.data.message || "Signup successful! Redirecting to login...");
      
      // Delay navigation slightly to let the user read the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500); 
      
    } catch (err) {
      // Display error message
      setMessage(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  // Function to navigate to the login page
  const handleLoginNavigation = (e) => {
    e.preventDefault(); 
    navigate("/login");
  };

  return (
    <section style={styles.section}>
      
      {/* Leaves Animation Container (CSS animations must be in a separate file) */}
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
      
      {/* Signup Form (The Glassmorphism Box) */}
      <div className="signup" style={styles.signup}>
        <h2 style={styles.signupH2}>Sign Up</h2>
        
        {/* Display message */}
        {message && <p style={{ 
          color: message.includes("successful") ? 'green' : '#8f2c24', 
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>{message}</p>}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          
          {/* Email Input */}
          <div className="inputBox" style={styles.inputBox}>
            <input 
              type="email" 
              placeholder="Email" 
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
          
          {/* Signup Button */}
          <div className="inputBox" style={styles.inputBox}>
            <input 
              type="submit" 
              value="Sign Up" 
              id="btn" 
              style={styles.button}
            />
          </div>
          
          {/* Login Link */}
          <div className="group" style={styles.group}>
            <p style={{ margin: 0, color: '#8f2c24', fontSize: '1.25em' }}>
                Already have an account?&nbsp;
                <a 
                    href="/login" 
                    onClick={handleLoginNavigation} 
                    style={styles.anchor}
                >
                    Login
                </a>
            </p>
          </div>
          
        </form>
      </div>
    </section>
  );
}

export default Signup;