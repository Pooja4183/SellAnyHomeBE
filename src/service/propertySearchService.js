const propertySearchRouter = require("express").Router(),
  { propertyDB, totalRecords } = require("../model/property"),
  agentDB  = require("../model/agent");

/**
 * Searches a property a property by id.
 */
propertySearchRouter.get("/", async (req, res) => {
  /* Pagination */
  let page = req.query.page || 1; // Current page number
  const limit = req.query.size || 10; // Number of items per page
  if (page == 0) {
    page = 1;
  }
  let skip = (page - 1) * limit; // Calculate the number of items to skip

  const { search, status, isBuy } = req.query;
  /* Search */
  console.log("Search::", req.query);

  /* Filter */
  // Create an empty filter object
  const filter = {};

  // Apply search filter if search query parameter is provided
  if (search) {
    filter.$or = [
      { address: { $regex: new RegExp(search, "i") } },
      { city: { $regex: new RegExp(search, "i") } },
      { state: { $regex: new RegExp(search, "i") } },
    ];
  }

  // Apply status filter if status query parameter is provided
  if (status) {
    if (status.toLowerCase() === "draft") {
      filter.$and = [
        { status: { $regex: new RegExp(status, "i") } },
        { status: { $exists: false } },
      ];
    } else {
      filter.status = { $regex: new RegExp(status, "i") };
    }
  }

  /* Additional Filters*/
  const homeType = req.query.homeType;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  if (homeType) {
    filter.homeType = homeType;
  }

  if(isBuy){
    filter.isBuy = isBuy;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = minPrice;
    }
    if (maxPrice) {
      filter.price.$lte = maxPrice;
    }
  }
  /* Sorting */
  const sortField = req.query.sort || "homeType"; // Default sort field is 'price'
  let sort = sortField.toUpperCase();
  let sortOrder = "asc"; // Default sort order is ascending

  if (sort == "High to Low".toUpperCase()) {
    sort = "price";
    sortOrder = "desc";
  } else if (sort == "Low to High".toUpperCase()) {
    sort = "price";
  } else if (sort == "Popular".toUpperCase()) {
    sort = "sqFt";
  } else if (sort == "latest".toUpperCase()) {
    sort = "updatedAt";
    sortOrder = "desc";
  } else {
    sort = "homeType";
  }

  const sortOptions = {};
  sortOptions[sort] = sortOrder === "desc" ? -1 : 1;

  /* Headers */
  const propertyFields = Object.keys(propertyDB.schema.obj);
  //console.debug(propertyFields);

  try {
    // Perform a case-insensitive search using regular expressions, apply the filters, and sort the results
    const query = propertyDB.find(filter);
    const totalRecords = await query.countDocuments(); // Total number of records matching the query

    // Calculate total number of pages based on total records and limit per page
    const totalPages = Math.ceil(totalRecords / limit);

    // Perform a case-insensitive search using regular expressions
    const results = await propertyDB
      .find(filter)
      .populate('agent')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    // Send the results as the response
    res.status(200).json({
      message: "property data fetched successfully",
      page: page,
      pageSize: limit,
      records: results.length,
      totalRecords: totalRecords,
      numberofpages: totalPages,
      property: results,
      headers: propertyFields,
    });
  } catch (error) {
    console.error("Error performing property search:", error);
    res.status(500).json({ error: "An error occurred while performing property search" });
  }
});

propertySearchRouter.get("/auto-complete", async (req, res) => {
  const searchQuery = req.query.search;

  try {
    // Define the aggregation pipeline
    const pipeline = [
      {
        $search: {
          index: "propertySearchIndex",
          autocomplete: { query: searchQuery, path: "city" },
        },
      },
      { $limit: 20 },
      { $project: { _id: 0, homeType: 1, address: 2 } },
    ];

    // Run the aggregation pipeline using the Property model
    const result = await propertyDB.aggregate(pipeline);

    // Send the results as the response
    // res.json(result);
    res.status(200).json({
      message: "property data fetched successfully",
      property: result,
    });
  } catch (error) {
    console.error("Error performing property search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while performing property search" });
  }
});

module.exports = propertySearchRouter;
