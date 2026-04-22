import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGeneration } from '../context/GenerationalContext';

export const JuniorRoute = ({ children }: { children: React.ReactNode }) => {
  const { world } = useGeneration();
  
  // Zámek: Pokud svět není KIDS, vykopneme ho na Gateway. Fail-closed.
  if (world !== 'KIDS') {
    return <Navigate to="/gateway" replace />;
  }
  return <>{children}</>;
};