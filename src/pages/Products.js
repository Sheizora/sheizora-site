import React from 'react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Gold Necklace', price: 1500, image: '/gold-necklace.jpg' },
  { id: 2, name: 'Diamond Earrings', price: 950, image: '/diamond-earrings.jpg' },
  { id: 3, name: 'Traditional Bangle', price: 700, image: '/bangle.jpg' },
];

const Products = () => {
  const { addToCart } = useCart();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Jewellery Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">AED {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
