import React, { useState } from 'react';
import { HeartHandshake, MapPin, CheckCircle, Navigation } from 'lucide-react';

interface Task {
  id: number;
  location: string;
  items: string;
  status: 'pending' | 'completed';
}

const VolunteerDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, location: 'Sector 4 Community Center', items: '20 Food Packets', status: 'pending' },
    { id: 2, location: 'Relief Camp B', items: '50 Clothing Items', status: 'pending' },
  ]);

  const markCompleted = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));
  };

  return (
    <div className="dashboard-content" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(52, 211, 153, 0.2)', padding: '1rem', borderRadius: '50%', color: '#34D399' }}>
          <HeartHandshake size={32} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Volunteer Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Active tasks and assigned routes</p>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
          <Navigation size={24} /> Assigned Distribution Tasks
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1.5rem', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} color="#60A5FA"/> {task.location}
                </h3>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>Deliver: {task.items}</p>
              </div>
              <div>
                {task.status === 'pending' ? (
                  <button 
                    onClick={() => markCompleted(task.id)}
                    className="primary-btn" 
                    style={{ padding: '0.5rem 1rem', background: '#34D399', color: '#111827', fontWeight: 'bold' }}
                  >
                    Mark Delivered
                  </button>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399' }}>
                    <CheckCircle size={20} /> Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
