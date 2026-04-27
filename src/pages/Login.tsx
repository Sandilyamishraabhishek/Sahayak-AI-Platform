import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Role } from '../context/AppContext';
import { User, Building2, Crown, HeartHandshake, ArrowLeft, Mail, Lock, LogIn } from 'lucide-react';
import { findUserInDB, signJWT, saveUserSession } from '../utils/auth';

const Login: React.FC = () => {
  const { setRole, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (roleId: Role) => {
    setSelectedRole(roleId);
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && email && password) {
      const user = findUserInDB(email);
      if (!user || user.password !== password || user.role !== selectedRole) {
          setError('Invalid credentials or incorrect role selected.');
          return;
      }
      
      const { password: _, ...userWithoutPassword } = user;
      const token = signJWT(userWithoutPassword);
      const sessionUser = { ...userWithoutPassword, token };
      
      saveUserSession(sessionUser);
      setCurrentUser(sessionUser);
      setRole(selectedRole);
      navigate('/dashboard');
    }
  };

  const roles = [
    { id: 'user', title: 'Citizen User', icon: User, description: 'Request resources' },
    { id: 'ngo', title: 'NGO Partner', icon: Building2, description: 'Manage resources' },
    { id: 'owner', title: 'Admin / Owner', icon: Crown, description: 'Oversee stock' },
    { id: 'volunteer', title: 'Volunteer', icon: HeartHandshake, description: 'Distribute roles' }
  ];

  const activeRole = roles.find(r => r.id === selectedRole);

  return (
    <div className="login-container" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '800px',
        width: '100%',
        padding: '3rem',
        borderRadius: '24px',
        textAlign: selectedRole ? 'left' : 'center',
        position: 'relative',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {!selectedRole ? (
          <>
            <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', background: 'linear-gradient(90deg, #4F46E5, #9333EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Welcome to Sahayak AI
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
              Please select your role to login
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {roles.map((roleInfo) => (
                <button
                  key={roleInfo.id}
                  onClick={() => handleRoleSelect(roleInfo.id as Role)}
                  className="role-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(79, 70, 229, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    background: 'rgba(79, 70, 229, 0.15)', 
                    padding: '1rem', 
                    borderRadius: '50%',
                    color: '#818CF8',
                    transition: 'all 0.3s ease'
                  }}>
                    <roleInfo.icon size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{roleInfo.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{roleInfo.description}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ maxWidth: '400px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
            <button 
              onClick={() => setSelectedRole(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                marginBottom: '2rem',
                fontSize: '1rem',
                padding: '0'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <ArrowLeft size={20} /> Back to roles
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                background: 'rgba(79, 70, 229, 0.15)',
                padding: '1rem', 
                borderRadius: '50%',
                color: '#818CF8',
                display: 'inline-flex',
                marginBottom: '1rem'
              }}>
                {activeRole && <activeRole.icon size={32} />}
              </div>
              <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#fff' }}>
                {activeRole?.title} Login
              </h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                Enter your credentials to access the dashboard
              </p>
            </div>

            {error && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 3rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#818CF8';
                      e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 3rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#818CF8';
                      e.target.style.boxShadow = '0 0 0 2px rgba(129, 140, 248, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: '#4F46E5', cursor: 'pointer' }} />
                  Remember me
                </label>
                <a href="#" style={{ color: '#818CF8', textDecoration: 'none' }} onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}>
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  background: 'linear-gradient(90deg, #4F46E5, #9333EA)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                  transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <LogIn size={20} />
                Sign In to Dashboard
              </button>
            </form>
          </div>
        )}

      </div>
      
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link to="/register" style={{ color: '#818CF8', textDecoration: 'none' }}>Register here</Link>
        </div>

      {/* Inline styles for basic animations that don't need a stylesheet */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
