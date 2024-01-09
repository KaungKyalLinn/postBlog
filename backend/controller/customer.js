const asyncHandler = require("express-async-handler");
const blogPostModel = require("../model/blogPostModel");

const fetchBlog = asyncHandler( async(req, res) => {
  const blogs = await blogPostModel.find().sort({createdAt : "descending"});
  res.json(blogs)
});

module.exports = fetchBlog;