const express = require("express");

// Initialize express application
const app = express();

// Import routes
const authRoutes = require("./routes/auth");

// Apply the middleware
app.use("/api/auth", authRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
