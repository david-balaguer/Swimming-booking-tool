import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();
const db = new Database("swimming.db"); // creates or opens a local SQLite DB

app.use(cors());
app.use(express.json()); // allows JSON request bodies

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL
  )
`).run();

// Route to handle new bookings
app.post("/bookings", (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "Missing field(s)" });
  }

  const stmt = db.prepare(
    "INSERT INTO bookings (name, email, date, time) VALUES (?, ?, ?, ?)"
  );
  stmt.run(name, email, date, time);

  res.json({ message: "Booking saved successfully!" });
});

// Route to list all bookings
app.get("/bookings", (req, res) => {
  const bookings = db.prepare("SELECT * FROM bookings").all();
  res.json(bookings);
});

app.listen(5000, () => console.log("Server running on port 5000"));
