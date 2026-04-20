import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import OwnerDashboard from '../components/dashboards/OwnerDashboard';
import NGODashboard from '../components/dashboards/NGODashboard';
import VolunteerDashboard from '../components/dashboards/VolunteerDashboard';
import UserDashboard from '../components/dashboards/UserDashboard';

const Dashboard: React.FC = () => {
  const { role } = useAppContext();

  // Redirect to login if no role is selected
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Render specific dashboard based on role
  switch (role) {
    case 'owner':
      return <OwnerDashboard />;
    case 'ngo':
      return <NGODashboard />;
    case 'volunteer':
      return <VolunteerDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default Dashboard;
