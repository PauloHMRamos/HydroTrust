import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/index';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/Auth/dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />  {/* Página inicial */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
