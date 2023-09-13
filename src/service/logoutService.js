const logoutRouter = require("express").Router();

const passport = require("../config/passport");

/**
 * Handles user login.
 */
logoutRouter.post("/", (req, res, next) => {
    console.log("Logging Out");
  // Check if the user is authenticated (you should have your own authentication logic)
  if (req.isAuthenticated()) {
    // If the user is authenticated, destroy their session
    req.logout(() => {
        res.status(200).json({ message: "Logged out successfully" });
      });
  } else {
    // If the user is not authenticated, return an error
    res.status(401).json({ message: 'Not authenticated' });
  }
 });

module.exports = logoutRouter;
