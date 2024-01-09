const asyncHandler = require("express-async-handler");
const blogUserModel = require("../model/blogUserModel");
const tokenGenarate = require("../util/tokenGenarate");
const matchPassword = require("../util/matchPassword")

const blogUserRegister = asyncHandler (async (req, res) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password){
    res.status(400)
    throw new Error("please fill the all fields")
  }
  const existUser = await blogUserModel.findOne({email});
  if(existUser){
    res.status(400)
    throw new Error("User already exist. Please login.")
  }
  const newBlogUser = await blogUserModel.create({
    name,
    email,
    password
  })
  tokenGenarate(res, newBlogUser._id)
  res.status(200).json({
    name : newBlogUser.name,
    email : newBlogUser.email
  });
})

const blogUserLogin = asyncHandler (async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    res.status(400)
    throw new Error("please fill the all fields.");
  }
  const existUser = await blogUserModel.findOne({email});
  if(!existUser){
    res.status(400)
    throw new Error("User not exist. Please register first.")
  }else if(existUser && await matchPassword(password, existUser.password)){
    tokenGenarate(res, existUser._id)
    res.status(200).json({
      name : existUser.name,
      email : existUser.email
    });
  }else{
    res.status(401)
    throw new Error("invailed email or password")
  }
})

const blogUserUpdate = asyncHandler (async (req, res) => {
  const {name, email, password} = req.body;
  const blogUser = await blogUserModel.findById(req.blogUserId);
  if(!blogUser){
    res.status(400)
    throw new Error("User not found")
  }
  if(blogUser && email === blogUser.email){
    blogUser.name = name || blogUser.name;
    if(password){
      blogUser.password = password
    }
    const updatedBlogUser = await blogUser.save();
    res.status(200).json({
      name : updatedBlogUser.name,
      email : updatedBlogUser.email
    });
  }else{
    throw new Error("Something went wrong")
  }
})

const blogUserLogout = asyncHandler (async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message : "logout success"});
})

const blogUserControl = {
  blogUserRegister,
  blogUserLogin,
  blogUserUpdate,
  blogUserLogout
};

module.exports = blogUserControl;