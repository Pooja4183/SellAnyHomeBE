const propertySearchRouter = require('express').Router(),
  propertyDB = require('../model/property');

/**
 * Searches a property a property by id.
 */
propertySearchRouter.get('/', async (req, res) => {
  const { search } = req.query;
  console.log("Searching...", search);
  
  try {
    // Perform a case-insensitive search using regular expressions
    const results = await propertyDB.find({
      $or: [
        { address: { $regex: new RegExp(search, 'i') } },
        { city: { $regex: new RegExp(search, 'i') } },
        { state: { $regex: new RegExp(search, 'i') } },
        
      ]
    }).limit(20);

    // Send the results as the response
    res.status(200).json({
      message: 'property data fetched successfully',
      property: results
    });
  } catch (error) {
    console.error('Error performing property search:', error);
    res.status(500).json({ error: 'An error occurred while performing property search' });
  }
});


propertySearchRouter.get('/auto-complete', async (req, res) => {
const searchQuery = req.query.search;
  
  try {
    // Define the aggregation pipeline
    const pipeline = [
      { $search: { index: 'propertySearchIndex', autocomplete: { query: searchQuery, path: 'city' } } },
      { $limit: 20 },
      { $project: { _id: 0, homeType: 1, address: 2 } },
    ];

    // Run the aggregation pipeline using the Property model
    const result = await propertyDB.aggregate(pipeline);

    // Send the results as the response
   // res.json(result);
    res.status(200).json({
      message: 'property data fetched successfully',
      property: result
    });
  } catch (error) {
    console.error('Error performing property search:', error);
    res.status(500).json({ error: 'An error occurred while performing property search' });
  }
});




module.exports = propertySearchRouter;
