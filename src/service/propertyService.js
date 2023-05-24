const propertyRouter = require('express').Router(),
  propertyDB = require('../model/property');
const propertySearchRouter= require('./propertySearchService');
/**
 * Creates a new property.
 */
propertyRouter.post('', (req, res, next) => {

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
   
    
  });

  property.save();
  console.log(property);
  res.status(201).json({
    message: 'property data added successfully',
  });
});

/**
 * Returns list of propertys
 */
propertyRouter.get('', async (req, res, next) => {
  const { search } = req.query;
  
  console.log("Searching in property...", search);
  if(search) {
     propertySearchRouter(req,res, next);
  } else {
    console.log("Fetching...")
    propertyDB.find().then((docs) => {
      res.status(200).json({
        property: docs,
      });
    });
  }

});

/**
 * Returns a property by id.
 */
propertyRouter.get('/:id', (req, res, next) => {
  propertyDB.findById(req.params.id).then((propertydb) => {
    res.status(200).json({
      message: 'Id fetched successfully!',
      property: propertyid,
    });
  });
});


module.exports = propertyRouter;
