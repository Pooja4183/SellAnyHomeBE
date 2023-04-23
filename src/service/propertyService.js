const propertyRouter = require('express').Router(),
  propertyDB = require('../model/property');

/**
 * Creates a new property.
 */
propertyRouter.post('', (req, res, next) => {
  const property = new propertyDB({
    id: req.body.id,
    price: req.body.price,
    img1: req.body.img1,
    img2: req.body.img2,
    propertyName: req.body.propertyName,
    brand: req.body.brand,
    discountPrice: req.body.discountPrice,
    discountLable: req.body.discountLable,
    rating: req.body.rating,
    sale: req.body.sale,
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
propertyRouter.get('/', (req, res, next) => {
  console.log("Fetching...")
  propertyDB.find().then((docs) => {
    res.status(200).json({
      message: 'data fetched successfully!',
      property: docs,
    });
  });
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
