import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Package, Plus, Search, ShieldCheck } from 'lucide-react';

const OwnerDashboard: React.FC = () => {
  const { stock, updateStock } = useAppContext();
  const [addFoodAmount, setAddFoodAmount] = useState(0);
  const [addClothAmount, setAddClothAmount] = useState(0);

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (addFoodAmount > 0) updateStock('food', addFoodAmount);
    if (addClothAmount > 0) updateStock('clothes', addClothAmount);
    setAddFoodAmount(0);
    setAddClothAmount(0);
  };

  return (
    <div className="dashboard-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(79, 70, 229, 0.2)', padding: '1rem', borderRadius: '50%', color: '#818CF8' }}>
          <ShieldCheck size={32} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Platform Owner Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Overview of all platform resources</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Total Stock View */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <Package size={24} /> Current Platform Stock
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#34D399' }}>{stock.food}</div>
              <div style={{ color: 'var(--text-muted)' }}>Food Packets</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#60A5FA' }}>{stock.clothes}</div>
              <div style={{ color: 'var(--text-muted)' }}>Clothing Items</div>
            </div>
          </div>
        </div>

        {/* Add Stock Form */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
            <Plus size={24} /> Add Inventory
          </h2>
          <form onSubmit={handleAddStock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Food Packets to Add</label>
              <input 
                type="number" 
                min="0"
                value={addFoodAmount} 
                onChange={(e) => setAddFoodAmount(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Clothing Items to Add</label>
              <input 
                type="number" 
                min="0"
                value={addClothAmount} 
                onChange={(e) => setAddClothAmount(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <button type="submit" className="primary-btn" style={{ marginTop: '1rem', padding: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <Plus size={20} /> Update Stock
            </button>
          </form>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <Search size={24} /> Audit Log (Simulated)
        </h2>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
          <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>[10:30 AM] NGO "Helping Hands" requested 50 Food Packets (Granted)</li>
          <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>[09:15 AM] 100 Clothes added to central warehouse inventory.</li>
          <li style={{ padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>[Yesterday] Volunteer "John D." fulfilled delivery of 20 Food Packets.</li>
        </ul>
      </div>
    </div>
  );
};

export default OwnerDashboard;
