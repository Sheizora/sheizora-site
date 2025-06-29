import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Replace this with your real admin check logic
    const userIsAdmin = true; // or check with auth.currentUser etc.
    if (!userIsAdmin) {
      alert('Access denied');
      navigate('/');
    }
  }, [navigate]);  // <-- navigate included here

  const handleUpload = () => {
    alert(`Uploaded: ${productName}, AED ${productPrice}`);
    setProductName('');
    setProductPrice('');
    setProductImage('');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Upload Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        className="border p-2 mb-2 w-full"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="border p-2 mb-2 w-full"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="border p-2 mb-4 w-full"
        value={productImage}
        onChange={(e) => setProductImage(e.target.value)}
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Upload Product
      </button>
    </div>
  );
};

export default AdminPanel;
