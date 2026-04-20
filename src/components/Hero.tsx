import React from 'react';
import { motion } from 'framer-motion';
import { Network, Activity } from 'lucide-react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section flex-center" id="hero">
      <div className="hero-bg-animated">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="container hero-content text-center">
        <motion.div 
          className="badge glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Activity size={16} className="text-primary-green" />
          <span>AI Systems Online</span>
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connecting Needs with Action <br />
          <span className="gradient-text">— Instantly, Intelligently.</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sahayak AI is a futuristic resource allocation platform that instantly identifies urgent community needs and orchestrates volunteers using intelligent analytics.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn-primary glow-box">
            <Network size={20} />
            Initialize Demo
          </button>
          <button className="btn-secondary glass">
            View Analytics
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
