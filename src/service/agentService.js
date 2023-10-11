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
    createdAt: Date.now(),
    updatedAt:  Date.now()
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
    console.log("Agent Result::", results);
    res.status(200).json({
      message: "Agents fetched successfully",
      agents: results
    });
  }catch (error) {
    console.error("Error fetching agent:", error);
    res.status(500).json({ error: "An error occurred while fetching agents" });
  }
 
    
});


agentRouter.get('/:id', async(req, res, next) => {
  console.log("Fetching Agents...")
  try {
    const results = await agentDB.findById(req.params.id);
    console.log("Agent Result::", results);
    res.status(200).json({
      message: "Id fetched successfully!",
      agents: results
    });
  
  }catch (error) {
    console.error("Error fetching agent:", error);
    res.status(500).json({ error: "An error occurred while fetching agent id " + req.params.id });
  }
 
    
});

agentRouter.delete("/:id", async (req, res, next) => {
  console.log("Deleting record::", req.params.id)
  try {
    const response = await agentDB.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Id deleted successfully!",
      property: response,
    });
  } catch (error) {
    console.error("Error deleting agent with id:", error);
    res.status(500).json({ error: "An error occurred while deleting the agent with id" });
  }
});

module.exports = agentRouter;
