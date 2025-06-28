import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white text-black">
      <section className="h-96 bg-[url('/jewels.jpg')] bg-cover bg-center flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 p-4 rounded">
          Welcome to Sheizora Jewellery
        </h1>
      </section>

      <section className="p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Elegant. Traditional. Timeless.</h2>
        <p className="text-lg">
          Discover the finest Udupi and Mangalorean inspired designs crafted to perfection. We bring to you 
          authentic and unique pieces that shine forever.
        </p>
        <Link to="/products">
          <button className="mt-6 bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800">
            Shop Now
          </button>
        </Link>
      </section>

      <footer className="bg-gray-900 text-white p-4 text-center">
        <p>Contact: <a href="mailto:diamondcluster05@gmail.com" className="underline">diamondcluster05@gmail.com</a></p>
        <p>
          <a href="https://wa.me/971563124681" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> | 
          <a href="https://www.instagram.com/sheizora?igsh=amNzajJyOXZqcm9m" target="_blank" rel="noopener noreferrer" className="underline ml-1">Instagram</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
