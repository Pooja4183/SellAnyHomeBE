const propertyRouter = require("express").Router(),
  { propertyDB, totalRecords } = require("../model/property");
const sendEmail = require("../config/email");
const propertySearchRouter = require("./propertySearchService");





/**
 * Creates a new property.
 */
propertyRouter.post("", (req, res, next) => {
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
    description: req.body.description,
    img1: req.body.img1,
    img2: req.body.img2,
    yearBuilt: req.body.yearBuilt,
    contactName: req.body.name,
    contactEmail: req.body.email,
    contactPhone: req.body.phone,
    sellerType: req.body.sellerType,
    isListed: req.body.isListed,
    sellDuration: req.body.duration,
    status: req.body.status || "DRAFT",
  });

  property.save();
  console.log(property);

  sendEmail(property);

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
    });
  });
});

module.exports = propertyRouter;
