import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { User, AlertCircle } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { stock } = useAppContext();
  const [requested, setRequested] = useState(false);

  const handleAidRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
  };

  return (
    <div className="dashboard-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(96, 165, 250, 0.2)', padding: '1rem', borderRadius: '50%', color: '#60A5FA' }}>
          <User size={32} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Citizen Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>View availability & request assistance</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Platform Availability */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ marginTop: 0 }}>System Resources Availability</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Currently available on Sahayak Platform.</p>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Food Availability</span>
              <span style={{ color: stock.food > 0 ? '#34D399' : '#EF4444' }}>{stock.food > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ height: '100%', width: `${Math.min(100, (stock.food / 1000) * 100)}%`, background: '#34D399' }}></div>
            </div>
          </div>

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Clothing Availability</span>
              <span style={{ color: stock.clothes > 0 ? '#60A5FA' : '#EF4444' }}>{stock.clothes > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
               <div style={{ height: '100%', width: `${Math.min(100, (stock.clothes / 500) * 100)}%`, background: '#60A5FA' }}></div>
            </div>
          </div>
        </div>

        {/* Request Aid */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
             Request Assistance
          </h2>
          {requested ? (
            <div style={{ padding: '2rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid #34D399', borderRadius: '12px', textAlign: 'center', marginTop: '1rem' }}>
               <AlertCircle size={48} color="#34D399" style={{ margin: '0 auto 1rem auto' }} />
               <h3 style={{ color: '#34D399', margin: '0 0 0.5rem 0' }}>Request Submitted</h3>
               <p style={{ color: 'var(--text-muted)', margin: 0 }}>The nearest NGO or volunteer will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleAidRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
               <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Required Type</label>
                  <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', color: 'white' }}>
                    <option value="both">Food & Clothes</option>
                    <option value="food">Food Only</option>
                    <option value="clothes">Clothes Only</option>
                  </select>
               </div>
               <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Urgency</label>
                  <select style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', color: 'white' }}>
                    <option value="high">High (Within 12 Hours)</option>
                    <option value="medium">Medium (Within 24 Hours)</option>
                  </select>
               </div>
               <button type="submit" className="primary-btn" style={{ marginTop: '1rem', padding: '0.75rem' }}>
                 Submit Help Request
               </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
