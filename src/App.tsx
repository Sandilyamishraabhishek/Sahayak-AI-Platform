import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DemoSimulation from './components/DemoSimulation';
import DashboardMetrics from './components/DashboardMetrics';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [aiEnabled, setAiEnabled] = useState(true);

  return (
    <div className="app-wrapper">
      
      {/* Animated Background Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Header aiEnabled={aiEnabled} setAiEnabled={setAiEnabled} />
      
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <DemoSimulation aiEnabled={aiEnabled} />
              <DashboardMetrics />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        padding: '3rem 2rem', 
        marginTop: '6rem',
        textAlign: 'center',
        paddingBottom: '4rem' 
      }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)' }}>
            &copy; 2026 Sahayak AI - Designed for the AI Hackathon.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
