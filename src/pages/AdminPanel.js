import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || user.email !== "youradminemail@example.com") {
      navigate("/");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || (!imageFile && !editingId)) {
      alert("All fields are required.");
      return;
    }

    try {
      let imageUrl = null;

      if (imageFile) {
        const imageRef = ref(storage, `product-images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (editingId) {
        const productRef = doc(db, "products", editingId);
        await updateDoc(productRef, {
          name,
          price: parseFloat(price),
          ...(imageUrl && { imageUrl }),
        });
        alert("Product updated.");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "products"), {
          name,
          price: parseFloat(price),
          imageUrl,
          createdAt: new Date(),
        });
        alert("Product added.");
      }

      setName("");
      setPrice("");
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditingId(product.id);
  };

  const handleDelete = async (product) => {
    if (window.confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", product.id));
      if (product.imageUrl) {
        const filePath = decodeURIComponent(product.imageUrl.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, filePath);
        await deleteObject(imageRef).catch(() => {});
      }
      fetchProducts();
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          value={price}
          placeholder="Price"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        <button type="submit">{editingId ? "Update" : "Add Product"}</button>
      </form>

      <h3>Uploaded Products</h3>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ddd", padding: "1rem", marginTop: "1rem" }}>
          <img src={product.imageUrl} alt={product.name} width="100" />
          <h4>{product.name} - ₹{product.price}</h4>
          <button onClick={() => handleEdit(product)}>Edit</button>
          <button onClick={() => handleDelete(product)} style={{ color: "red", marginLeft: "10px" }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
