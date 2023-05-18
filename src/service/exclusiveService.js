const exclusiveRouter = require('express').Router(),
  propertyDB = require('../model/property');



/**
 * Returns list of propertys
 */
exclusiveRouter.get('/', (req, res, next) => {
  console.log("Fetching...")
  propertyDB.find().limit(3).then((docs) => {
    res.status(200).json({
      message: 'data fetched successfully!',
      property: docs,
    });
  });
});

/**
 * Returns a property by id.
 */
exclusiveRouter.get('/:id', (req, res, next) => {
  propertyDB.findById(req.params.id).then((propertydb) => {
    res.status(200).json({
      message: 'Id fetched successfully!',
      property: propertyid,
    });
  });
});


module.exports = exclusiveRouter;
