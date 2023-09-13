const registrationRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
/**
 * Creates a new property.
 */
registrationRouter.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed" });
    }
  });
  
module.exports = registrationRouter;