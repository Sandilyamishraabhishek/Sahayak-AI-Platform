import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Building2, Send, BarChart2 } from 'lucide-react';

const NGODashboard: React.FC = () => {
  const { stock, updateStock } = useAppContext();
  const [requestFood, setRequestFood] = useState(0);
  const [requestCloth, setRequestCloth] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestFood > stock.food || requestCloth > stock.clothes) {
      setStatusMsg('Error: Requested amount exceeds available central stock.');
      return;
    }
    
    // Simulate approval and deducting from central stock for NGO's own local pool distribution
    if (requestFood > 0) updateStock('food', -requestFood);
    if (requestCloth > 0) updateStock('clothes', -requestCloth);
    
    setStatusMsg(`Successfully secured ${requestFood} food and ${requestCloth} clothes for distribution.`);
    setRequestFood(0);
    setRequestCloth(0);
  };

  return (
    <div className="dashboard-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '1rem', borderRadius: '50%', color: '#F472B6' }}>
          <Building2 size={32} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>NGO Partner Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage community resources & allocations</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Availability View */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <BarChart2 size={24} /> Central Stock Availability
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Current available resources on the Sahayak platform.</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2rem 0' }}>
             <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#34D399' }}>{stock.food}</div>
              <div style={{ color: 'var(--text-muted)' }}>Food Packets</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#60A5FA' }}>{stock.clothes}</div>
              <div style={{ color: 'var(--text-muted)' }}>Clothing Items</div>
            </div>
          </div>
        </div>

        {/* Request Resources */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <Send size={24} /> Request Resources
          </h2>
          <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Food Packets Required</label>
              <input 
                type="number" 
                max={stock.food}
                min="0"
                value={requestFood} 
                onChange={(e) => setRequestFood(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Clothing Items Required</label>
              <input 
                type="number"
                max={stock.clothes} 
                min="0"
                value={requestCloth} 
                onChange={(e) => setRequestCloth(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <button type="submit" className="primary-btn" style={{ marginTop: '1rem', padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              Submit Request
            </button>
            {statusMsg && <div style={{ marginTop: '1rem', padding: '1rem', background: statusMsg.includes('Error') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', color: statusMsg.includes('Error') ? '#FCA5A5' : '#6EE7B7' }}>{statusMsg}</div>}
          </form>
        </div>

      </div>
    </div>
  );
};

export default NGODashboard;
