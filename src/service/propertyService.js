const propertyRouter = require("express").Router(),
  { propertyDB } = require("../model/property");
const { sendEmail } = require("../config/email");
const propertySearchRouter = require("./propertySearchService");

/**
 * Creates a new property.
 */
propertyRouter.post("", async (req, res, next) => {
  try {
    const property = new propertyDB({
      ...req.body,
      contactName: req.body.name,
      contactEmail: req.body.email,
      contactPhone: req.body.phone,

      sellDuration: req.body.duration,
      status: req.body.status || "DRAFT",
    });

    property.save();

    await sendEmail(property);

    res.status(201).json({
      message: "property data added successfully",
      property: property
    });
  } catch (error) {
    console.error("Error occurred while creating a property", error);
    res.status(500).json({ error: "An error occurred while creating a property" });
  }
});

propertyRouter.put("/:id", async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updates = req.body;

    const updatedProperty = await propertyDB.findByIdAndUpdate(
      propertyId,
      updates,
      { new: true }
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "An error occurred while updating the property" });
  }
});


const processQueryParams = (req, res, next) => {
  // Process and validate query parameters here
  const { status } = req.query;

  //  Ensure 'status' parameter is valid
  const validStatuses = ["approved", "draft", "rejected"];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    return res.status(400).json({ error: "Invalid status parameter. Possible Values are: " + validStatuses });
  }

  // Continue to the next middleware or route handler
  next();
};

/**
 * Returns list of properties
 */
propertyRouter.get("", processQueryParams, async (req, res, next) => {
    /* Forwarded to Search and Filter Service. */
    propertySearchRouter(req, res);
  
});

/**
 * Returns a property by id.
 */
propertyRouter.get("/:id", async (req, res, next) => {
  try {
    const response = await propertyDB.findById(req.params.id);
    res.status(200).json({
      message: "Id fetched successfully!",
      property: response,
    });
  } catch (error) {
    console.error("Error fetching property by id:", error);
    res.status(500).json({ error: "An error occurred while fetching the property by id" });
  }
});

module.exports = propertyRouter;
