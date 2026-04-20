import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Clock, Globe } from 'lucide-react';
import './ProblemSolution.css';

const features = [
  {
    icon: <Share2 className="text-primary-blue" size={32} />,
    title: "Scattered Data",
    desc: "Community issues are often reported across unlinked channels, losing critical response time."
  },
  {
    icon: <Clock className="text-primary-purple" size={32} />,
    title: "Delayed Action",
    desc: "Without AI prioritization, urgent needs (food, medical) face fatal delays in assignment."
  },
  {
    icon: <Globe className="text-primary-green" size={32} />,
    title: "Skill Misalignment",
    desc: "Volunteers arrive at locations where their specific skills aren't the primary need."
  }
];

const ProblemSolution: React.FC = () => {
  return (
    <section className="section" id="problem">
      <div className="container">
        <div className="text-center mb-xl">
          <h2 className="section-title">The <span className="gradient-text">Challenge</span></h2>
          <p className="section-subtitle">Why traditional resource allocation fails during emergencies.</p>
        </div>
        
        <div className="grid-3">
          {features.map((item, index) => (
            <motion.div 
              key={index}
              className="card glass glow-box"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="card-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
