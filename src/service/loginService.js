const loginRouter = require("express").Router();

const passport = require("../config/passport");

/**
 * Handles user login.
 */
loginRouter.post("/", (req, res, next) => {
  
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Handle error
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // Handle error
      }
      /* Removed properties such as password, id updatedAt and __v from userwopwd. */
    ///  const {  id, ...userwopwd } = user._doc;

      return res.status(200).json({ success: true, user: user });
    });
  })(req, res, next); // Pass the request and response objects to passport.authenticate
});

module.exports = loginRouter;
