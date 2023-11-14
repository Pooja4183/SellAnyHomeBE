const blogRouter = require("express").Router(),
   blogDB  = require("../model/blog");

/**
 * Creates a new property.
 */
blogRouter.post("", async (req, res, next) => {
  try{
  const blog = new blogDB({
    ...req.body,
    status: req.body.status || "DRAFT", // Two values can be used here DRAFT and APPROVED
    createdAt: Date.now(),
    updatedAt:  Date.now()
  });
 
  blog.save();

  res.status(201).json({
    message: "Blog Submitted successfully",
    blog:  blog
  });
} catch(error) {
  res.status(500).json({
    error: "An error occurred while creating blog: " + error
  });
}
});

blogRouter.put("/:id", async (req, res, next) => {
  console.log("Inside Blog PUt", req.body);
  try {
    const blogId = req.params.id;
    const updates = req.body;

    const updatedBlog = await blogDB.findByIdAndUpdate(
      blogId,
      updates,
      { new: true }
    );

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "An error occurred while updating the blog" });
  }
});

blogRouter.get('/', async(req, res, next) => {
  console.log("Fetching Blogs...")
  try {
    const sortOptions = {
      sort : ["updatedAt", "desc"]
    };
    const results = await blogDB.find({}).sort('-updatedAt').exec();
    console.log("Blog Result::", results);
    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs: results
    });
  }catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "An error occurred while fetching blogs" });
  }
 
    
});


blogRouter.get('/:id', async(req, res, next) => {
  console.log("Fetching Blogs...")
  try {
    const results = await blogDB.findById(req.params.id);
    console.log("Blog Result::", results);
    res.status(200).json({
      message: "Id fetched successfully!",
      blogs: results
    });
  
  }catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "An error occurred while fetching blog id " + req.params.id });
  }
 
    
});

blogRouter.delete("/:id", async (req, res, next) => {
  console.log("Deleting record::", req.params.id)
  try {
    const response = await blogDB.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Id deleted successfully!",
      property: response,
    });
  } catch (error) {
    console.error("Error deleting blog with id:", error);
    res.status(500).json({ error: "An error occurred while deleting the blog with id" });
  }
});

module.exports = blogRouter;
