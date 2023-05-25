const exclusiveRouter = require('express').Router(),
  {propertyDB} = require('../model/property');



/**
 * Returns list of propertys
 */
exclusiveRouter.get('/', (req, res, next) => {
  console.log("Fetching...")

  propertyDB.aggregate([
    { $sample: { size: 3 } }
  ])
    .then((results) => {
        res.status(200).json({
            property: results,
          });
    })
    .catch((error) => {
        res.status(500).json({
            error: error,
          });
    });
  
});

/**
 * Returns a property by id.
 */
exclusiveRouter.get('/:id', (req, res, next) => {
  propertyDB.findById(req.params.id).then((propertydb) => {
    res.status(200).json({
      property: propertyid,
    });
  });
});


module.exports = exclusiveRouter;
