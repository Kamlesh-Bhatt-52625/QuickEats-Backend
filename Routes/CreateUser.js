const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisKamleshBhatt";

router.post(
  "/createuser",
  [
    // username must be an email
    body("email").isEmail(),
    //
    body("name").isLength({ min: 5 }),
    // password must be at least 5 chars long
    body("password", "Password must be alteast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, email, location } = req.body;
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(password, salt);

    try {
      await User.create({
        name: name,
        password: secPassword,
        email: email,
        location: location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

// Login
router.post(
  "/loginuser",
  [
    // username must be an email
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be alteast 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { name, password, email, location } = req.body;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Incorrect Credantials" });
      }

      const pwdCompare = await bcrypt.compare(password, userData.password);

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Incorrect Credantials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
