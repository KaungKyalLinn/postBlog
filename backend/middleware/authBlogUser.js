const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler( async (req, res, next) => {
  let token;
  if(req.headers.cookie){
    try{
      token = req.headers.cookie.split("=")[1];
      const user = await jwt.verify(token, process.env.JWT_SECRET);
      req.blogUserId = user.id
      next();
    }
    catch(err){
      throw new Error(err.message);
    }
  }else{
    res.status(401)
    throw new Error("authorization fail...")
  }
});

module.exports = auth;