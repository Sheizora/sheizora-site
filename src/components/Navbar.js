import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-black text-white flex items-center justify-between p-4">
      <div className="flex items-center">
        <img src={logo} alt="Sheizora Logo" className="w-10 h-10 rounded" />
        <h1 className="ml-2 text-xl font-bold">Sheizora</h1>
      </div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/products">Jewellery</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
