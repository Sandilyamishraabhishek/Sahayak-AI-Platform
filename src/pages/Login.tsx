import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Role } from '../context/AppContext';
import { User, Building2, Crown, HeartHandshake } from 'lucide-react';

const Login: React.FC = () => {
  const { setRole } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    navigate('/dashboard');
  };

  const roles = [
    { id: 'user', title: 'Citizen User', icon: User, description: 'Request resources and view availabilities' },
    { id: 'ngo', title: 'NGO Partner', icon: Building2, description: 'Manage resource requests and distribution' },
    { id: 'owner', title: 'Platform Owner', icon: Crown, description: 'Oversee all stock and operations' },
    { id: 'volunteer', title: 'Volunteer', icon: HeartHandshake, description: 'Assist in resource distribution tasks' }
  ];

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
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', background: 'linear-gradient(90deg, #4F46E5, #9333EA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome to Sahayak AI
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Please select your role to continue
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {roles.map((roleInfo) => (
            <button
              key={roleInfo.id}
              onClick={() => handleLogin(roleInfo.id as Role)}
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
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{ 
                background: 'rgba(79, 70, 229, 0.2)', 
                padding: '1rem', 
                borderRadius: '50%',
                color: '#818CF8'
              }}>
                <roleInfo.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{roleInfo.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{roleInfo.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
