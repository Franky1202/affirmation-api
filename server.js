// Import the required packages
const express = require("express");
const fetch = require("node-fetch"); // used to call the external API
const app = express();

// Root route: fetch a random affirmation from an external API
app.get("/", async (req, res) => {
  try {
    // Call an external affirmation API (you can change this URL)
    const response = await fetch("https://www.affirmations.dev/");
    const data = await response.json();

    // Send it back to the user as JSON
    res.json({ affirmation: data.affirmation });
  } catch (error) {
    console.error("Error fetching affirmation:", error);
    res.status(500).json({ error: "Unable to fetch affirmation" });
  }
});

// Optional route: get multiple affirmations (e.g., 5 at once)
app.get("/many", async (req, res) => {
  try {
    const affirmations = [];

    // Fetch 5 random affirmations
    for (let i = 0; i < 5; i++) {
      const response = await fetch("https://www.affirmations.dev/");
      const data = await response.json();
      affirmations.push(data.affirmation);
    }

    res.json({ affirmations });
  } catch (error) {
    console.error("Error fetching affirmations:", error);
    res.status(500).json({ error: "Unable to fetch multiple affirmations" });
  }
});

// Use Render's or local port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Affirmation API running on port ${PORT}`);
});



/*old hardcoded way
const express = require("express");
const app = express();

const affirmations = [
  "You are loved, valued, and appreciated.",
  "You’re doing better than you think!",
  "Every day, in every way, you're getting stronger.",
  "You have what it takes to succeed.",
  "Are you garbage? Because I want to collect you 😄",
  "Your potential is endless.",
  "You make the world a brighter place just by being in it."
];

app.get("/", (req, res) => {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  const randomAffirmation = affirmations[randomIndex];
  res.json({ affirmation: randomAffirmation });
});

// 👇 Use the dynamic port provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Affirmation API running on port ${PORT}`);
});
*/

/*
Upload It to GitHub

Render connects directly to GitHub, so:

Create a GitHub account (if you don’t have one yet).

Create a new repository, e.g. affirmation-api.

Push your project folder to GitHub:

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/affirmation-api.git
git push -u origin main

☁️ 5. Deploy to Render

Go to 👉 https://render.com

Log in (with GitHub).

Click “New +” → “Web Service”

Choose your GitHub repo (affirmation-api)

Settings:

Environment: Node

Build Command: npm install

Start Command: npm start

Click Create Web Service

Render will:

Install dependencies

Start your app

Give you a live URL, something like:

https://affirmation-api.onrender.com

🥳 6. Test It!
*/