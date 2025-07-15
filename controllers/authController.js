const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

module.exports = {
  // Show login page
  showLoginPage: (req, res) => {
    res.render("login", {
      error: req.query.error || null,
      message: req.query.message || null,
    });
  },

  // Handle login form submission
  handleLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.render("login", {
          error: "Username and password required",
          message: null,
        });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.render("login", {
          error: "Invalid credentials",
          message: null,
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.render("login", {
          error: "Invalid credentials",
          message: null,
        });
      }

      // Store user in session
      req.session.user = {
        _id: user._id,
        username: user.username,
        role: user.role,
      };

      // Redirect based on role
      if (user.role === "admin") {
        res.redirect("/list-registrations");
      } else {
        res.redirect("/register-event");
      }
    } catch (error) {
      res.render("login", {
        error: error.message,
        message: null,
      });
    }
  },

  // Handle logout
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/");
      }
      res.redirect("/login");
    });
  },

  // API login (existing method)
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password required" });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { id: user._id, role: user.role, username: user.username },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.jwtExpiration,
        }
      );
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
