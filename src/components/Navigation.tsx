import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <motion.nav 
      className="main-nav"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-container container">
        <div className="logo-container">
          <Zap className="logo-icon" size={24} />
          <h1 className="logo-text">Sahayak<span className="gradient-text">.ai</span></h1>
        </div>
        
        <div className="nav-links">
          <a href="#problem">The Need</a>
          <a href="#features">Features</a>
          <a href="#demo">Live Demo</a>
        </div>
        
        <div className="nav-actions">
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
            <span className="toggle-label">AI Mode</span>
          </label>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
