import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img src={logo} alt="Sheizora Logo" style={{ height: '50px', marginRight: '20px' }} />
      <h1 style={{ fontWeight: 'bold', color: '#333', fontSize: '24px' }}>Sheizora Jewellery</h1>
    </nav>
  );
};

export default Navbar;
