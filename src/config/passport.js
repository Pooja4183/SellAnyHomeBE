const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../model/user");


passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log("Inside Passport::", email, password);
       // Check if the provided email matches the static user's email
       const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Invalid email or password" });
      }
      
       
        // Compare the provided password with the stored hashed password
        const passwordMatch = await user.comparePassword(password);

        // If passwords match, return the user
        if (passwordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid email or password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);



  
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
