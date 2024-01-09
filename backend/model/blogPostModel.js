const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const blogPostSchema = mongoose.Schema({
  blogName : {
    type : String,
    require : true
  },
  blogBody : {
    type : String,
    require : true
  },
  author: {
    type : String,
    default : "Unknown author"
  },
  authorEmail : {
    type : String,
    require : true
  },
  authorId : {
    type : String,
    require : true
  }
},
{
  timestamps : true
});

// hash author id
blogPostSchema.pre("save", async function(next){
  if(!this.isModified("authorId")){
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.authorId = await bcrypt.hash(this.authorId, salt)
})

const blogPostModel = mongoose.model("blogPost", blogPostSchema);

module.exports = blogPostModel;