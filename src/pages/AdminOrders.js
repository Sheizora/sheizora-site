import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user || user.email !== "youradminemail@example.com") {
      alert("Access denied");
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ccc", marginBottom: "20px", padding: "10px" }}>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Ordered At:</strong> {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleString() : ""}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} - ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
