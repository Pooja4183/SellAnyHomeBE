const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const user = {
    id: 1, // You can use any unique identifier for the user
    email: process.env.USER,
    password: process.env.PASSPHRASE
    // Other user properties...
};

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log("Inside Passport::", email, password);
       // Check if the provided email matches the static user's email
      if (email !== process.env.USER) {
        return done(null, false, { message: "Invalid email or password" });
      }
      
       
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, process.env.PASSPHRASE);

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

passport.deserializeUser((id, done) => {
  // Since the user is static, you can deserialize by user.id
  if (id === user.id) {
    done(null, user);
  } else {
    done(null, false);
  }
});

module.exports = passport;
