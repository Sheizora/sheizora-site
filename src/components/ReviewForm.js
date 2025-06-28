import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("All fields are required");
      return;
    }
    try {
      await addDoc(collection(db, "reviews"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setError("");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Failed to submit review");
    }
  };

  if (submitted) return <p>Thank you for your review!</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h3>Submit a Review</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <textarea
        placeholder="Your review"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
        rows={4}
        style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <button type="submit" style={{ padding: "10px 20px" }}>Submit Review</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ReviewForm;
