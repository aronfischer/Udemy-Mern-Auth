const express = require("express");

// Initialize express application
const app = express();

app.get("/api", (req, res) => {
  res.send({ message: "Hello from the backend again" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
