const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Day 07 JWT Auth API is running",
  });
});

// Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  res.status(201).json({
    message: "Registration successful",
    access_token: data.session?.access_token || null,
    user: data.user,
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  res.json({
    message: "Login successful",
    access_token: data.session.access_token,
    user: data.user,
  });
});

app.listen(8000, () => {
  console.log("Day 07 server is running on port 8000");
});