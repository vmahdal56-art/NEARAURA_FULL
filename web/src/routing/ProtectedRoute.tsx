import React from 'react';
import { Navigate } from 'react-router-dom';
import { Ledger } from '../utils/storage';

export const ProtectedRoute = ({ children }) => {
  if (!Ledger.verify()) return <Navigate to="/exile" replace />;
  if (Ledger.get('OATH') !== 'signed') return <Navigate to="/oath" replace />;
  if (Ledger.get('AUTH') !== 'AUTHENTICATED') return <Navigate to="/gateway" replace />;
  return children;
};