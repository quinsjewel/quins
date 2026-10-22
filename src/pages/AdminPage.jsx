import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../components/AdminLogin';
import { AdminPortal } from '../components/AdminPortal';
import { StoreService } from '../services/store';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(StoreService.isAdminAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(StoreService.isAdminAuthenticated());
  }, []);

  const handleReturnToStore = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onReturnToStore={handleReturnToStore}
      />
    );
  }

  return (
    <AdminPortal
      onReturnToStore={handleReturnToStore}
    />
  );
}
