const propertySearchRouter = require("express").Router(),
  {propertyDB, totalRecords} = require("../model/property");

/**
 * Searches a property a property by id.
 */
propertySearchRouter.get("/", async (req, res) => {
  /* Pagination */
  const page = req.query.page || 1; // Current page number
  const limit = req.query.size || 10; // Number of items per page
  const skip = (page - 1) * limit; // Calculate the number of items to skip

  /* Search */
  const { search } = req.query;
  console.log("Searching...", search);

  /* Filter */
  const filter = {
    $or: [
      { address: { $regex: new RegExp(search, "i") } },
      { city: { $regex: new RegExp(search, "i") } },
      { state: { $regex: new RegExp(search, "i") } },
    ],
  };

  /* Additional Filters*/
  const homeType = req.query.homeType;
  const minPrice =  req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  if (homeType) {
    filter.homeType = homeType;
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
let sort = req.query.sort.toUpperCase();
console.log("Sort Query::", sort, sort.length, "High to Low".toUpperCase(), "High to Low".length, sort=="High to Low".toUpperCase());
let sortOrder = "asc"; // Default sort order is ascending

if (sort == "High to Low".toUpperCase()) {
  sort = "price";
  sortOrder = "desc";
} else if (sort == "Low to High".toUpperCase()) {
  sort = "price";
} else if (sort == 'Popular'.toUpperCase()){
  sort = "sqFt";
} else {
  sort = "homeType";
}
const sortField = sort || "homeType"; // Default sort field is 'price'
console.log("Sort Field::", sortField, sortField.length,"::", sort, sort.length, sortField==sort);
const sortOptions = {};
sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;



  try {
    // Perform a case-insensitive search using regular expressions
    const results = await propertyDB
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
       const tr =  await totalRecords();
      // console.log("Tr:", tr);
      const totalPages = Math.ceil( tr/ limit);

    // Send the results as the response
    res.status(200).json({
      message: "property data fetched successfully",
      page: page,
      pageSize: limit,
      records: results.length,
     // totalRecords: tr,
      numberofpages: totalPages,
      property: results,
    });
  } catch (error) {
    console.error("Error performing property search:", error);
    res
      .status(500)
      .json({ error: "An error occurred while performing property search" });
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
