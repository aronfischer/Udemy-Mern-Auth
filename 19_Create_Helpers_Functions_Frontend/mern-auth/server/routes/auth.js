const express = require("express");
const router = express.Router();

// Import Controllers
const { signUp, activateAccount } = require("../controllers/auth");

// Import Validators

// Router
router.post("/sign-up", signUp);
router.post("/account-activation", activateAccount);

module.exports = router;
