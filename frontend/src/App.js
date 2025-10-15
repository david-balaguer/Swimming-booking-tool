import React, { useState } from "react";
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch("https://swimming-booking-tool.onrender.com/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ Booking saved! Thanks, ${formData.name}.`);
        setFormData({ name: "", email: "", date: "", time: "" });
      } else {
        setMessage(`⚠️ Error: ${result.error}`);
      }
    } catch {
      setMessage("❌ Could not connect to the server.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", margin: "2rem auto", maxWidth: "400px" }}>
      <h1>🏊‍♂️ Swim with David!!</h1>
      <p>Private swimming lessons in Leipzig for everyone</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="date">Date:</label>
        <input id="date" type="date" value={formData.date} onChange={handleChange} required />

        <label htmlFor="time">Time:</label>
        <input id="time" type="time" value={formData.time} onChange={handleChange} required />

        <button type="submit">Book Now</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;
