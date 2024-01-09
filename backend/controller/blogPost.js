const asyncHandler = require("express-async-handler");
const blogPostModel = require("../model/blogPostModel");
const blogUserModel = require("../model/blogUserModel");
const matchAuthor = require("../util/matchAuthor");

const getUserBlogs = asyncHandler (async (req, res) => {
  const blogUser = await blogUserModel.findById(req.blogUserId);
  const userBlogs = await blogPostModel.find({authorEmail : blogUser.email}).sort({ createdAt : "descending"});
  res.status(200).json(userBlogs)
})

const blogCreate = asyncHandler (async (req, res) => {
  const { blogName, blogBody, author, authorEmail } = req.body;
  if(blogName || blogBody){
    const blog = await blogPostModel.create({
      blogName,
      blogBody,
      author,
      authorEmail,
      authorId : req.blogUserId
    })
    res.status(200).json({
      blogName : blog.blogName,
      blogBody : blog.blogBody,
      author : blog.author,
      _id : blog._id
    });
  }else{
    res.status(400)
    throw new Error("please fill all the fields.")
  }
})

const blogUpdate = asyncHandler (async (req, res) => {
  const {blogName, blogBody, blogId} = req.body;
  const blog = await blogPostModel.findById(blogId);
  if(!blog){
    res.status(404)
    throw new Error("Blog not found")
  }else if(blog && await matchAuthor(req.blogUserId, blog.authorId)){
    blog.blogName = blogName || blog.blogName;
    blog.blogBody = blogBody || blog.blogBody;
    const updatedBlog = await blog.save();
    res.status(200).json({
      blogName : updatedBlog.blogName,
      blogBody : updatedBlog.blogBody,
      _id : updatedBlog._id
    });
  }else{
    res.status(401)
    throw new Error("Not blog owner");
  }
})

const blogDelete = asyncHandler (async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogPostModel.findById(blogId);
  if(!blog){
    res.status(404)
    throw new Error("Blog not found")
  }else if(blog && await matchAuthor(req.blogUserId, blog.authorId)){
    try{
      await blogPostModel.findByIdAndDelete(blogId);
      res.status(200).json({message : "One blog successfully deleted"})
    }
    catch(err){
      res.status(500)
      throw new Error("something went wrong")
    }
  }else{
    res.status(401)
    throw new Error("Not blog owner")
  }
})

const blogControl = {
  getUserBlogs,
  blogCreate,
  blogUpdate,
  blogDelete
}

module.exports = blogControl;