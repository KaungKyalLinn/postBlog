const express = require("express");
const router = express.Router();
const fetchBlog = require("../controller/customer")

router.get("/", fetchBlog);

module.exports = router;