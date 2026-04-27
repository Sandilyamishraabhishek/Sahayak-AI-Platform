import type { Role } from '../context/AppContext';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: Role;
  lat?: number;
  lng?: number;
  token?: string;
  password?: string; // Stored just for mock login validation
}

// Mock JWT signing using standard Base64 encoding
export const signJWT = (user: Omit<UserData, 'token' | 'password'>): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ ...user, exp: Date.now() + 1000 * 60 * 60 * 24 })); // 1 day expiration
  const signature = btoa("mock_secret_key");
  return `${header}.${payload}.${signature}`;
};

// Mock standard decoded JWT verification
export const verifyJWT = (token: string): Omit<UserData, 'token' | 'password'> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (Date.now() > payload.exp) return null; // JWT has expired
    return payload;
  } catch (error) {
    return null;
  }
};

export const saveUserSession = (user: UserData) => {
  localStorage.setItem('sahayak_user', JSON.stringify(user));
};

export const getSessionUser = (): UserData | null => {
  const data = localStorage.getItem('sahayak_user');
  if (!data) return null;
  const user: UserData = JSON.parse(data);
  if (!user.token) return null;
  
  if (verifyJWT(user.token)) {
      return user;
  }
  
  // Clear if expired
  localStorage.removeItem('sahayak_user');
  return null;
};

export const clearSession = () => {
  localStorage.removeItem('sahayak_user');
};

export const saveUserToDB = (user: UserData) => {
  const existing = localStorage.getItem('sahayak_users_db');
  const db = existing ? JSON.parse(existing) : [];
  db.push(user);
  localStorage.setItem('sahayak_users_db', JSON.stringify(db));
};

export const findUserInDB = (email: string) => {
  const existing = localStorage.getItem('sahayak_users_db');
  const db: UserData[] = existing ? JSON.parse(existing) : [];
  return db.find(u => u.email === email);
};

// Haversine formula to get distance in kilometers
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};
