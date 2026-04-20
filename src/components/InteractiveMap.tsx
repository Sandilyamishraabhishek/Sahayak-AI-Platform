import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, AlertCircle, CheckCircle } from 'lucide-react';
import './InteractiveMap.css';

interface DemoProps {
  simulationState: number; // 0 = Idle, 1 = Analysis, 2 = Highlight, 3 = Matched
}

const InteractiveMap: React.FC<DemoProps> = ({ simulationState }) => {
  return (
    <div className="map-container glass">
      <div className="map-overlay"></div>
      
      {/* Mock Map Grid lines */}
      <div className="map-grid"></div>
      
      {/* Central Base / Impact Zone */}
      <motion.div 
        className={`map-node impact-zone ${simulationState >= 2 ? 'active-zone' : ''}`}
        animate={{ 
          scale: simulationState >= 2 ? [1, 1.2, 1] : 1,
          boxShadow: simulationState >= 2 ? '0 0 30px rgba(255, 51, 51, 0.8)' : '0 0 10px rgba(0, 240, 255, 0.2)' 
        }}
        transition={{ duration: 1, repeat: simulationState >= 2 ? Infinity : 0 }}
      >
        {simulationState >= 2 ? <AlertCircle className="text-priority-high" /> : <MapPin className="text-primary-blue" />}
        
        <AnimatePresence>
          {simulationState >= 2 && (
            <motion.div 
              className="zone-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              HIGH PRIORITY
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Volunteer Nodes */}
      <motion.div className={`map-node volunteer v-1 ${simulationState === 3 ? 'matched' : ''}`}>
        <User size={16} />
      </motion.div>
      <motion.div className="map-node volunteer v-2">
        <User size={16} />
      </motion.div>
      <motion.div className="map-node volunteer v-3">
        <User size={16} />
      </motion.div>

      {/* Connection Line */}
      {simulationState === 3 && (
        <svg className="map-connections">
          <motion.path 
            d="M 50% 50% L 20% 30%" 
            stroke="var(--primary-green)" 
            strokeWidth="3" 
            strokeDasharray="10 5"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* Assignment Success Status */}
      <AnimatePresence>
        {simulationState === 3 && (
          <motion.div 
            className="success-badge glass text-primary-green"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 1 }}
          >
            <CheckCircle size={16} /> Volunteer Assigned
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default InteractiveMap;
