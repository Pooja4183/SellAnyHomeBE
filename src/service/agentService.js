const agentRouter = require("express").Router(),
   agentDB  = require("../model/agent");

/**
 * Creates a new property.
 */
agentRouter.post("", async (req, res, next) => {
  try{
  const agent = new agentDB({
    ...req.body,
    status: req.body.status || "DRAFT", // Two values can be used here DRAFT and APPROVED
  });
 
  agent.save();

  res.status(201).json({
    message: "Agent Submitted successfully",
    agent:  agent
  });
} catch(error) {
  res.status(500).json({
    error: "An error occurred while creating agent: " + error
  });
}
});

agentRouter.put("/:id", async (req, res, next) => {
  console.log("Inside Agent PUt", req.body);
  try {
    const agentId = req.params.id;
    const updates = req.body;

    const updatedAgent = await agentDB.findByIdAndUpdate(
      agentId,
      updates,
      { new: true }
    );

    res.status(200).json({
      message: "Agent updated successfully",
      agent: updatedAgent,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "An error occurred while updating the agent" });
  }
});

agentRouter.get('/', async(req, res, next) => {
  console.log("Fetching Agents...")
  try {
    const results = await agentDB.find({});
    res.status(200).json({
      message: "Agents fetched successfully",
      agents: results
    });
  }catch (error) {
    console.error("Error fetching agent:", error);
    res.status(500).json({ error: "An error occurred while fetching agents" });
  }
 
    
});
module.exports = agentRouter;
