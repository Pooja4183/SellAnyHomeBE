const propertyRouter = require("express").Router(),
  { propertyDB, totalRecords } = require("../model/property");
const sendEmail = require("../config/email");
const propertySearchRouter = require("./propertySearchService");

/**
 * Creates a new property.
 */
propertyRouter.post("", async (req, res, next) => {
  const property = new propertyDB({
    id: req.body.id,
    homeType: req.body.homeType,
    isBuy: req.body.isBuy,
    bed: req.body.bed,
    bath: req.body.bath,
    price: req.body.price,
    currency: req.body.currency,
    sqFt: req.body.sqFt,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    title: req.body.title,
    description: req.body.description,
    images: req.body.images,
    img1: req.body.img1,
    img2: req.body.img2,
    yearBuilt: req.body.yearBuilt,
    contactName: req.body.name,
    contactEmail: req.body.email,
    contactPhone: req.body.phone,
    sellerType: req.body.sellerType,
    isListed: req.body.isListed,
    sellDuration: req.body.duration,
    amenities: req.body.amenities,
    status: req.body.status || "DRAFT",
  });
 
  property.save();
  //console.log(property);

  await sendEmail(property);

  res.status(201).json({
    message: "property data added successfully",
  });
});

/**
 * Returns list of propertys
 */
propertyRouter.get("", async (req, res, next) => {
  const { search } = req.query;
  console.log("Search::", req.query);
  // console.log("Searching in property...", search, search == null, search != null, search == undefined, search == '', search.length);
  if (search) {
    propertySearchRouter(req, res);
  } else {
    console.log("Fetching...");
    propertyDB.find().then((docs) => {
      res.status(200).json({
        message: "Data Fetched Successfully",
        property: docs,
      });
    });
  }
});

/**
 * Returns a property by id.
 */
propertyRouter.get("/:id", (req, res, next) => {
  propertyDB.findById(req.params.id).then((propertydb) => {
    res.status(200).json({
      message: "Id fetched successfully!",
      property: req.params.id,
      id: propertydb.id,
      homeType: propertydb.homeType,
      isBuy: propertydb.isBuy,
      bed: propertydb.bed,
      bath: propertydb.bath,
      price: propertydb.price,
      currency: propertydb.currency,
      sqFt: propertydb.sqFt,
      address: propertydb.address,
      city: propertydb.city,
      state: propertydb.state,
      title: propertydb.title,
      description: propertydb.description,
      images: propertydb.iamges,
      img1: propertydb.img1,
      yearBuilt: propertydb.yearBuilt,
      contactName: propertydb.contactName,
      contactEmail: propertydb.contactEmail,
      contactPhone: propertydb.contactPhone,
      sellerType: propertydb.sellerType,
      isListed: propertydb.isListed,
      sellDuration: propertydb.sellDuration,
      amenities: propertydb.amenities,
      status: propertydb.status,
    });
  });
});

propertyRouter.put('/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updates = req.body;

    const updatedProperty = await propertyDB.findByIdAndUpdate(propertyId, updates, { new: true });

    res.status(200).json({
      message: 'Property updated successfully',
      property: updatedProperty
    });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'An error occurred while updating the property' });
  }
});


module.exports = propertyRouter;
