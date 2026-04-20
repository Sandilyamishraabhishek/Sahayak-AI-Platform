import { motion } from 'framer-motion';
import { ArrowRight, Activity, Users, ShieldAlert } from 'lucide-react';

export default function HeroSection() {


  return (
    <section className="section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingTop: '80px'
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '6px 16px',
            borderRadius: '30px',
            marginBottom: '2rem',
            color: 'var(--primary-blue)',
            fontWeight: 500,
            fontSize: '0.875rem'
          }}
        >
          <div className="pulse-blue" style={{ width: '8px', height: '8px', background: 'var(--primary-blue)', borderRadius: '50%' }} />
          Smart AI Resource Orchestration Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}
        >
          Connecting Needs with Action <br />
          <span className="gradient-text">Instantly, Intelligently.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem auto'
          }}
        >
          Sahayak AI analyzes scattered community data, identifies urgent needs, 
          and intelligently deploys the closest, most skilled volunteers in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
        >
          <a href="#features" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', cursor: 'pointer', textDecoration: 'none' }}>
            Start AI Simulation <ArrowRight size={20} />
          </a>
          <a href="#dashboard" className="btn-secondary" style={{ fontSize: '1.1rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            View Live Dashboard
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '5rem',
            textAlign: 'left'
          }}
        >
          {[
            { icon: <Activity color="var(--primary-blue)" />, title: 'Real-time AI Analysis', desc: 'Predicting resource shortages before they occur.' },
            { icon: <ShieldAlert color="var(--primary-purple)" />, title: 'Priority Scoring', desc: 'Auto-classifying urgency using dynamic criteria.' },
            { icon: <Users color="var(--primary-green)" />, title: 'Smart Deployment', desc: 'GPS-matching volunteers by skill & proximity.' }
          ].map((feature, idx) => (
            <div key={idx} className="glass glow-on-hover" style={{ padding: '1.5rem', transition: 'all 0.3s' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
