const propertyRouter = require('express').Router(),
  propertyDB = require('../model/property');

/**
 * Returns a property by id.
 */
propertyRouter.get('', (req, res, next) => {
  let srcQuery = req.query;
  console.log ("Searching..", srcQuery.qry );
  propertyDB.find( { $text: { $search: srcQuery } } )
  .then((propertydb) => {
    res.status(200).json({
      message: 'Searched successfully!',
      property: propertyid,
    });
  });

});

module.exports = propertyRouter;
