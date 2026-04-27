import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Role } from '../context/AppContext';
import { User, Building2, Crown, HeartHandshake, Mail, Lock, UserPlus, MapPin } from 'lucide-react';
import { signJWT, saveUserSession, saveUserToDB, findUserInDB } from '../utils/auth';

const Register: React.FC = () => {
  const { setRole, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const roles = [
    { id: 'user', title: 'Citizen User', icon: User, description: 'Request resources' },
    { id: 'ngo', title: 'NGO Partner', icon: Building2, description: 'Manage resources' },
    { id: 'owner', title: 'Admin', icon: Crown, description: 'Platform Owner' },
    { id: 'volunteer', title: 'Volunteer', icon: HeartHandshake, description: 'Distribute' }
  ];

  const handleGetLocation = () => {
    setLocationStatus('Locating...');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLocationStatus('Location acquired ✓');
        },
        (err) => {
          console.error(err);
          setLocationStatus('Unable to retrieve location');
        }
      );
    } else {
      setLocationStatus('Geolocation not supported');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !email || !password || !name) {
      setError("Please fill all required fields.");
      return;
    }
    
    if (findUserInDB(email)) {
      setError("User with this email already exists.");
      return;
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: selectedRole,
      lat,
      lng
    };

    // Store securely (Mock)
    saveUserToDB({ ...newUser, password });

    // Generate Mock JWT (excluding password)
    const token = signJWT(newUser);
    const sessionUser = { ...newUser, token };

    saveUserSession(sessionUser);
    setCurrentUser(sessionUser);
    setRole(selectedRole);

    navigate('/dashboard');
  };

  return (
    <div className="login-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '6rem 2rem 2rem 2rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '500px',
        width: '100%',
        padding: '3rem',
        borderRadius: '24px',
        position: 'relative',
        animation: 'fadeIn 0.5s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'rgba(79, 70, 229, 0.15)',
            padding: '1rem', 
            borderRadius: '50%',
            color: '#818CF8',
            display: 'inline-flex',
            marginBottom: '1rem'
          }}>
            <UserPlus size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#fff' }}>
            Create Account
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            Join Sahayak AI platform
          </p>
        </div>

        {error && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem', textAlign: 'center' }}>
                {error}
            </div>
        )}

        <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {roles.map((r) => (
              <div 
                 key={r.id} 
                 onClick={() => setSelectedRole(r.id as Role)}
                 style={{
                    padding: '0.75rem',
                    background: selectedRole === r.id ? 'rgba(79, 70, 229, 0.3)' : 'rgba(0,0,0,0.2)',
                    border: selectedRole === r.id ? '1px solid rgba(129, 140, 248, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    color: selectedRole === r.id ? '#fff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem'
                 }}
              >
                  <r.icon size={20} />
                  <span style={{ fontSize: '0.85rem' }}>{r.title}</span>
              </div>
            ))}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>Full Name *</label>
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>Email Address *</label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>Password *</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>Live Location</label>
            <button 
                type="button" 
                onClick={handleGetLocation}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
                <MapPin size={18} />
                {locationStatus || 'Click to Share Location'}
            </button>
            {lat && lng && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#34D399', textAlign: 'center' }}>
                    Coords: {lat.toFixed(4)}, {lng.toFixed(4)}
                </div>
            )}
          </div>

          <button type="submit"
            style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(90deg, #4F46E5, #9333EA)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' }}
          >
            Create Account
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/login" style={{ color: '#818CF8', textDecoration: 'none' }}>Log in here</Link>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Register;
