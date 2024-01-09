const express = require("express");
const router = express.Router();
const blogUserControl = require("../controller/blogUser");
const authBlogUser = require("../middleware/authBlogUser")

router.route("/").post(blogUserControl.blogUserRegister).put(authBlogUser, blogUserControl.blogUserUpdate);
router.post("/login",blogUserControl.blogUserLogin);
router.post("/logout",blogUserControl.blogUserLogout);

module.exports = router;