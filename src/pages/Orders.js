import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h4>Order on {new Date(order.createdAt.seconds * 1000).toLocaleString()}</h4>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} - ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
