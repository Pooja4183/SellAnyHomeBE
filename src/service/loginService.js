const loginRouter = require("express").Router(),
  agentDB = require("../model/agent");

/**
 * Creates a new property.
 */
loginRouter.post("", async (req, res, next) => {
  try {
    const filter = {};
    console.log("Request body::", req.body);
    filter.$and = [{ email: req.body.email }, { password: req.body.password }];
    const result = await agentDB.findOne(filter);
    console.log("Login Result::", result);
    if (result !== null) {
      res.status(200).json({
        message: "User  is Valid !" + result,
      });
    } else {
      res.status(401).json({
        message: "Invalid Credntials"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred during authentication: " + error,
    });
  }
});

module.exports = loginRouter;
