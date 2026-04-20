import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Role = 'user' | 'ngo' | 'owner' | 'volunteer' | null;

interface Stock {
  food: number;
  clothes: number;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  stock: Stock;
  updateStock: (type: keyof Stock, amount: number) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [stock, setStock] = useState<Stock>({
    food: 500,    // Initial mock data
    clothes: 300, // Initial mock data
  });

  const updateStock = (type: keyof Stock, amount: number) => {
    setStock((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount), // Prevent negative stock
    }));
  };

  const logout = () => setRole(null);

  return (
    <AppContext.Provider value={{ role, setRole, stock, updateStock, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
