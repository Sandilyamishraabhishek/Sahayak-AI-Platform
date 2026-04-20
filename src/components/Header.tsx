import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Settings2, Activity, Sparkles, ShieldCheck, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Header({ aiEnabled, setAiEnabled }: { aiEnabled: boolean, setAiEnabled: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { stock, role } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? 'rgba(9, 9, 11, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.02 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))',
              padding: '10px',
              borderRadius: '14px',
              display: 'flex',
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                 style={{
                   position: 'absolute',
                   inset: -20,
                   background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent)',
                 }}
              />
              <motion.div
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain size={26} color="white" style={{ position: 'relative', zIndex: 2 }} />
              </motion.div>
            </div>
            <h1 style={{ fontSize: '1.75rem', margin: 0, letterSpacing: '-0.5px', textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
              Sahayak <span className="gradient-text">AI</span>
            </h1>
          </motion.div>
        </Link>

        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}><Sparkles size={16} /> Home</Link>
            
            <Link to={role ? "/dashboard" : "/login"} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
               <Activity size={16} /> {role ? 'Dashboard' : 'Login'}
            </Link>
          </div>

          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 30 }}
            transition={{ delay: 0.5 }}
            style={{ width: '1px', background: 'var(--border-color)', margin: '0 0.5rem' }} 
          />

          {/* Platform Stock Snippet */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            title="Global Resource Stock"
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
          >
             <Package size={16} color="#34D399" />
             <div style={{ fontSize: '0.85rem' }}>
                <span style={{ color: '#34D399', fontWeight: 'bold' }}>{stock.food}</span> Food
                <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>|</span>
                <span style={{ color: '#60A5FA', fontWeight: 'bold' }}>{stock.clothes}</span> Clothes
             </div>
          </motion.div>

          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 30 }}
            transition={{ delay: 0.5 }}
            style={{ width: '1px', background: 'var(--border-color)', margin: '0 0.5rem' }} 
          />
          
          <motion.div 
            className="glass" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(139, 92, 246, 0.2)' }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '30px',
              border: aiEnabled ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid var(--border-color)',
              background: aiEnabled ? 'rgba(139, 92, 246, 0.05)' : 'var(--bg-card)',
              transition: 'all 0.3s ease'
            }}
          >
            {aiEnabled ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                key="enabled"
              >
                <ShieldCheck size={18} color="var(--primary-purple)" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                key="disabled"
              >
                <Settings2 size={18} color="var(--text-muted)" />
              </motion.div>
            )}

            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: aiEnabled ? 'var(--primary-purple)' : 'var(--text-muted)',
              textShadow: aiEnabled ? '0 0 10px rgba(139, 92, 246, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              AI Co-Pilot
            </span>
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              style={{
                width: '48px',
                height: '26px',
                background: aiEnabled ? 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))' : 'rgba(255,255,255,0.1)',
                borderRadius: '13px',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: aiEnabled ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'inset 0 2px 4px rgba(0,0,0,0.2)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <motion.div
                layout
                initial={false}
                animate={{ 
                  x: aiEnabled ? 24 : 2,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '22px',
                  height: '22px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AnimatePresence>
                  {aiEnabled && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      style={{
                        width: '6px',
                        height: '6px',
                        background: 'var(--primary-purple)',
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </button>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
