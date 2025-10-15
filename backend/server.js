import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json()); // allows JSON request bodies

// Open SQLite database
const db = await open({
  filename: "./database.sqlite",
  driver: sqlite3.Database,
});

// Create table if it doesn't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    date TEXT,
    time TEXT
  )
`);

// Route to handle bookings
app.post("/bookings", async (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "Missing field(s)" });
  }

  await db.run(
    "INSERT INTO bookings (name, email, date, time) VALUES (?, ?, ?, ?)",
    [name, email, date, time]
  );

  res.json({ message: "Booking saved successfully!" });
});

// Route to list bookings (for testing)
app.get("/bookings", async (req, res) => {
  const bookings = await db.all("SELECT * FROM bookings");
  res.json(bookings);
});

app.listen(5000, () => console.log("Server running on port 5000"));
