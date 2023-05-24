const propertySearchRouter = require('express').Router(),
  propertyDB = require('../model/property');

/**
 * Returns a property by id.
 */
propertySearchRouter.get('/', async (req, res, next) => {
  const { search } = req.query;
  console.log("Searching...", search);
  try {
    // Use the $text operator to perform text search
    //const results = await propertyDB.find({ $text: { $search: query } });

    const results = await propertyDB.find({ $text: { $search: search } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .select('name description city state location price bed bath');
    console.log("Results", results);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while searching for products' });
  }
 
});

module.exports = propertySearchRouter;
