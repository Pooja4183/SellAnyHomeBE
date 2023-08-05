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
       // Modify the output to convert _id to id and remove __v field
       const modifiedResults = results.map((result) => {
        const { _id, __v, ...rest } = result;
        return { id: _id, _id, ...rest };
      });
        res.status(200).json({
            property: modifiedResults,
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
      property: propertydb,
    });
  });
});


module.exports = exclusiveRouter;
