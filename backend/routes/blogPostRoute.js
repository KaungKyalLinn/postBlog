const express = require("express");
const router = express.Router();
const blogControl = require("../controller/blogPost");
const authBlogUser = require("../middleware/authBlogUser")

router.route("/").get(authBlogUser, blogControl.getUserBlogs).post(authBlogUser, blogControl.blogCreate).put(authBlogUser, blogControl.blogUpdate);
router.delete("/delete/:id", authBlogUser, blogControl.blogDelete);


module.exports = router;