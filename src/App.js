import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CropRecommendation from "./pages/CropReccomendation";
import LeafDiseaseDetection from "./pages/LeafDiseaseDetection";
import DailyMarketPrices from "./pages/DailyMarketPrices";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import MarketPriceForecasting from "./pages/MarketPriceForecasting";
import Dashboard from "./pages/DashBoard";
import Chatbot from "./pages/Chatbot";
import YieldPrediction from "./pages/YieldPrediction";
import AICropPlanner from "./pages/AICropPlanner";

function Home() {
  return <h2>Welcome to the Home Page!</h2>;
}

function About() {
  return <h2>This is the About Page.</h2>;
}

function Contact() {
  return <h2>Get in touch with us on the Contact Page.</h2>;
}

// ⭐ NEW Settings Component with Google Translate Logic
function Settings() {
  useEffect(() => {
    // Check if the Google Translate script has already been added
    if (!document.getElementById('google-translate-script')) {
      // 1. Function to initialize Google Translate (made available globally)
      window.googleTranslateElementInit = () => {
        const lang = localStorage.getItem('selectedLanguage');
        if (lang) {
          // Set the 'googtrans' cookie for language persistence
          document.cookie = `googtrans=/en/${lang};path=/`;
        }
        
        // Initialize the Google Translate widget
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,as,bn,gu,hi,kn,ml,mr,ne,or,pa,ta,te,ur',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );

        // 3. Add an event listener to the language selector after initialization
        setTimeout(() => {
          const selector = document.querySelector('.goog-te-combo');
          if (selector) {
            selector.addEventListener('change', (event) => {
              const selectedLang = event.target.value;
              localStorage.setItem('selectedLanguage', selectedLang);
            });
          }
        }, 500); // 0.5-second delay to ensure widget is loaded
      };

      // 2. Load the Google Translate element script
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <h2>Language Settings</h2>
      <p>Select your preferred language for the application:</p>
      {/* This is the container where the Google Translate widget will be placed */}
      <div id="google_translate_element"></div>
      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        Note: This uses Google Translate, which may not translate all elements perfectly.
      </p>
    </div>
  );
}
// ⭐ END NEW Settings Component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/CropRecommendation"
            element={
              <MainLayout>
                <CropRecommendation />
              </MainLayout>
            }
          />
          <Route
            path="/AICropPlanner"
            element={
              <MainLayout>
                <AICropPlanner />
              </MainLayout>
            }
          />
          <Route
            path="/YieldPrediction"
            element={
              <MainLayout>
                <YieldPrediction />
              </MainLayout>
            }
          />
          <Route
            path="/LeafDiseaseDetection"
            element={
              <MainLayout>
                <LeafDiseaseDetection />
              </MainLayout>
            }
          />
          <Route
            path="/DailyMarketPrices"
            element={
              <MainLayout>
                <DailyMarketPrices />
              </MainLayout>
            }
          />
          <Route
            path="/MarketPriceForecasting"
            element={
              <MainLayout>
                <MarketPriceForecasting />
              </MainLayout>
            }
          />
          <Route
            path="/Chatbot"
            element={
              <MainLayout>
                <Chatbot />
              </MainLayout>
            }
          />
          {/* ⭐ NEW Settings Route */}
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />
          {/* End of NEW Settings Route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;