import React, { useState } from 'react';
import { HeartHandshake, MapPin, CheckCircle, Navigation, Map as MapIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

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
  React.useEffect(() => {
    map.flyTo(center, 14, { duration: 1.5 });
  }, [center, map]);
  return null;
};

interface Task {
  id: number;
  location: string;
  items: string;
  status: 'pending' | 'completed';
}

const VolunteerDashboard: React.FC = () => {
  const { currentUser } = useAppContext();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, location: 'Sector 4 Community Center', items: '20 Food Packets', status: 'pending' },
    { id: 2, location: 'Relief Camp B', items: '50 Clothing Items', status: 'pending' },
  ]);

  const markCompleted = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));
  };

  const centerPosition = [currentUser?.lat || 28.6139, currentUser?.lng || 77.2090] as [number, number];

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
              <Navigation size={24} /> Assigned Distribution Tasks
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              {tasks.map(task => (
                <div key={task.id} style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '1.5rem', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                      <MapPin size={18} color="#60A5FA"/> {task.location}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Deliver: {task.items}</p>
                  </div>
                  <div>
                    {task.status === 'pending' ? (
                      <button 
                        onClick={() => markCompleted(task.id)}
                        className="primary-btn" 
                        style={{ width: '100%', padding: '0.75rem 1rem', background: '#34D399', color: '#111827', fontWeight: 'bold' }}
                      >
                        Mark Delivered
                      </button>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#34D399', padding: '0.75rem 1rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '12px' }}>
                        <CheckCircle size={20} /> Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}>
                  <MapIcon size={24} /> Live Volunteer Tracker
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>Broadcasting your current location: {centerPosition[0].toFixed(3)}, {centerPosition[1].toFixed(3)}</p>
              
              <div style={{ position: 'relative', background: '#0a0a14', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', width: '100%', flex: 1, minHeight: '400px', marginTop: '1rem' }}>
                  <MapContainer 
                    center={centerPosition} 
                    zoom={14} 
                    style={{ width: '100%', height: '100%', background: '#111827' }} 
                    zoomControl={false} 
                    attributionControl={false}
                  >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <MapController center={centerPosition} />
                    
                    <Marker position={centerPosition} icon={createVolunteerIcon('#34D399')}>
                      <Popup className="dark-popup">
                        <strong style={{ color: 'black' }}>{currentUser?.name || 'You'}</strong><br/>
                        <span style={{ color: 'var(--text-muted)' }}>Location Available For Routing</span>
                      </Popup>
                    </Marker>

                  </MapContainer>
              </div>
          </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
