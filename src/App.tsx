import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OttPage from './pages/OttPage';
import KidsPage from './pages/KidsPage';
import PlayerPage from './pages/PlayerPage';
import AdminDashboard from './pages/AdminDashboard';
import useSpatialNavigation from './hooks/useSpatialNavigation';
import './styles/App.css';

const AppContent: React.FC = () => {
  useSpatialNavigation();

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ott" element={<OttPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/player/:type/:id" element={<PlayerPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
