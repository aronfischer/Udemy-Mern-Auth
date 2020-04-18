const express = require("express");
const router = express.Router();

// Import Controllers
const { signUp } = require("../controllers/auth");

// Import Validators

// Router
router.get("/sign-up", signUp);

module.exports = router;
