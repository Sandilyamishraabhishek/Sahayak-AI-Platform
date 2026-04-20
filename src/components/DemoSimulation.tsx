import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle2, UserCheck, MapPin, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const createPulseIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-pulse-icon',
    html: `<div style="width: 24px; height: 24px; background: ${color}; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px ${color};"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const createVolunteerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-volunteer-icon',
    html: `<div style="width: 28px; height: 28px; background: white; border-radius: 50%; border: 3px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px ${color};"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
};

export default function DemoSimulation({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const [step, setStep] = useState(0); // 0: Input, 1: AI Processing, 2: Map & Match
  const [inputText, setInputText] = useState('');

  const [analysisResult, setAnalysisResult] = useState({
    issue: 'Food Shortage',
    priority: 'HIGH',
    priorityColor: 'var(--priority-high)',
    impact: '~50 Families',
    volunteer: 'Sarah K.',
    distance: '2.5 km away',
    iconColor: 'var(--primary-green)'
  });

  const startProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    
    // Simple mock AI Logic
    const txt = inputText.toLowerCase();
    
    if (!aiEnabled) {
      setAnalysisResult({ issue: 'Manual Review Needed', priority: 'PENDING', priorityColor: 'var(--border-color)', impact: 'Awaiting human assessment', volunteer: 'Unassigned', distance: '--', iconColor: 'var(--text-muted)' });
    } else if (txt.includes('flood') || txt.includes('water')) {
      setAnalysisResult({ issue: 'Flood Emergency', priority: 'HIGH', priorityColor: 'var(--priority-high)', impact: 'Multiple areas affected', volunteer: 'Rescue Team Alpha', distance: '4.2 km away', iconColor: 'var(--primary-blue)' });
    } else if (txt.includes('health') || txt.includes('medical') || txt.includes('injury')) {
      setAnalysisResult({ issue: 'Medical Emergency', priority: 'CRITICAL', priorityColor: 'var(--priority-high)', impact: 'Immediate medical attention', volunteer: 'Dr. Ramesh M.', distance: '1.1 km away', iconColor: 'var(--priority-high)' });
    } else if (txt.includes('education') || txt.includes('school')) {
      setAnalysisResult({ issue: 'Education Support', priority: 'MEDIUM', priorityColor: 'var(--priority-medium)', impact: 'Local Students', volunteer: 'Teach For India Rep', distance: '5.0 km away', iconColor: 'var(--primary-purple)' });
    } else {
      setAnalysisResult({ issue: 'General Aid Request', priority: 'LOW', priorityColor: 'var(--priority-low)', impact: 'Community Support', volunteer: 'Local Volunteer John', distance: '0.8 km away', iconColor: 'var(--primary-green)' });
    }

    if (!aiEnabled) {
       setStep(2);
    } else {
       setStep(1);
       setTimeout(() => setStep(2), 3000);
    }
  };

  return (
    <section id="features" className="section container" style={{ padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Intelligent <span className="gradient-text">Orchestration</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Watch Sahayak AI process a crisis and assign aid in milliseconds.</p>
      </div>

      <div className="glass" style={{ padding: '3rem', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Data Input */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px' }}
            >
              <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '600px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle color="var(--primary-medium)" /> Report Community Issue
                </h3>
                <form onSubmit={startProcessing} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="e.g. 'Severe food shortage affecting 50 families in Sector 4...'"
                    style={{
                      width: '100%', padding: '1rem', borderRadius: '8px', 
                      background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                      color: 'white', minHeight: '120px', fontFamily: 'inherit', resize: 'none',
                      outline: 'none'
                    }}
                  />
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Search size={18} /> {aiEnabled ? 'Analyze with AI' : 'Submit Manually'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 1: AI Processing */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '2rem' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  border: '4px solid rgba(139, 92, 246, 0.2)',
                  borderTopColor: 'var(--primary-purple)',
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Processing Data...</h3>
                <p style={{ color: 'var(--text-muted)' }}>Cross-referencing demographics, resources, and live map feeds.</p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Map & Match Result */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', height: '100%' }}
            >
              {/* Left Panel: Analysis */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 600 }}>Priority Status</span>
                    <span style={{ background: analysisResult.priorityColor, padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, color: 'black' }}>{analysisResult.priority}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{aiEnabled ? `AI Detection: "${analysisResult.issue}"` : `Status: ${analysisResult.issue}`}<br/>Impact: {analysisResult.impact}<br/>Urgency: {analysisResult.priority === 'CRITICAL' || analysisResult.priority === 'HIGH' ? 'Critical' : (aiEnabled ? 'Moderate' : 'Unknown')}</p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${analysisResult.iconColor}` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: analysisResult.iconColor }}>
                    <CheckCircle2 size={20} /> <strong>{aiEnabled ? 'Match Found' : 'Ticket Logged'}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: analysisResult.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCheck size={20} color="black" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Volunteer Assigned</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{analysisResult.volunteer} ({analysisResult.distance})</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.button 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                  onClick={() => { setStep(0); setInputText(''); }}
                  className="btn-secondary" style={{ marginTop: 'auto' }}
                >
                  Run New Simulation
                </motion.button>
              </div>

              {/* Right Panel: Live Map */}
              <div style={{ position: 'relative', background: '#0a0a14', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', height: '100%', minHeight: '400px', zIndex: 10 }}>
                <MapContainer 
                  center={[28.6139, 77.2090]} 
                  zoom={11} 
                  style={{ width: '100%', height: '100%', background: '#111827' }} 
                  zoomControl={false} 
                  attributionControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  <MapController center={
                    analysisResult.priority === 'HIGH' || analysisResult.priority === 'CRITICAL' 
                      ? [28.6139, 77.2090] 
                      : [28.5355, 77.3910]
                  } />
                  
                  {/* Crisis Location */}
                  <Marker 
                    position={
                      analysisResult.priority === 'HIGH' || analysisResult.priority === 'CRITICAL' 
                      ? [28.6139, 77.2090] 
                      : [28.5355, 77.3910]
                    } 
                    icon={createPulseIcon(analysisResult.priorityColor)}
                  >
                    <Popup className="dark-popup">
                      <strong style={{ color: 'black' }}>{analysisResult.issue}</strong><br/>
                      <span style={{ color: 'var(--text-muted)' }}>Priority: {analysisResult.priority}</span>
                    </Popup>
                  </Marker>

                  {/* Volunteer Location */}
                  <Marker 
                    position={
                      analysisResult.priority === 'HIGH' || analysisResult.priority === 'CRITICAL' 
                      ? [28.6450, 77.2350] 
                      : [28.5500, 77.4000]
                    } 
                    icon={createVolunteerIcon(aiEnabled ? '#10b981' : '#94a3b8')}
                  >
                    <Popup className="dark-popup">
                      <strong style={{ color: 'black' }}>Responder: {analysisResult.volunteer}</strong><br/>
                      <span style={{ color: 'var(--text-muted)' }}>ETA: {analysisResult.distance}</span>
                    </Popup>
                  </Marker>

                  {/* Route Line */}
                  <Polyline 
                    positions={[
                      analysisResult.priority === 'HIGH' || analysisResult.priority === 'CRITICAL' ? [28.6139, 77.2090] : [28.5355, 77.3910],
                      analysisResult.priority === 'HIGH' || analysisResult.priority === 'CRITICAL' ? [28.6450, 77.2350] : [28.5500, 77.4000]
                    ]} 
                    pathOptions={{ 
                      color: aiEnabled ? '#3b82f6' : '#94a3b8', 
                      dashArray: '8, 8', 
                      weight: 3,
                      opacity: 0.8
                    }} 
                  />
                </MapContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
