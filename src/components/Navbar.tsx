import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2 style={{ margin: 0, color: 'var(--accent-color)' }}>VRPlay</h2>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className="focusable" tabIndex={0}>Home</NavLink>
        <NavLink to="/ott" className="focusable" tabIndex={0}>OTT</NavLink>
        <NavLink to="/kids" className="focusable" tabIndex={0}>Kids</NavLink>
        <NavLink to="/admin" className="focusable" tabIndex={0}>Admin</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
