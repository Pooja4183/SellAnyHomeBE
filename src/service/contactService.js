const contactRouter = require("express").Router(),
   contactDB  = require("../model/contact"),
   { propertyDB } = require("../model/property");
const {sendContactEmail} = require("../config/email");

/**
 * Creates a new property.
 */
contactRouter.post("", async (req, res, next) => {
    const {name, email, phone, moreInfo, propertyId} = req.body;
    console.log("Name", name, "Property Id::", propertyId);
    
  const contact = new contactDB({
    id: req.body.id,
    buyerName: req.body.name,
    buyerEmail: req.body.email,
    buyerPhone: req.body.phone,
    moreInfo: req.body.moreInfo,
    propertyId: req.body.propertyId,
    status: req.body.status || "INITIATED", // Two values can be used here INITIATED and DONE
    createdAt: Date.now(),
    updatedAt:  Date.now()
  });
 
  contact.save();
  //console.log(property);
  const fetchedProperty = await propertyDB.findById(req.body.propertyId);

  await sendContactEmail(contact, fetchedProperty);

  res.status(201).json({
    message: "Buyer Interest Submitted successfully",
    buyerContact:  contact,
    property: fetchedProperty
  });
});


module.exports = contactRouter;
