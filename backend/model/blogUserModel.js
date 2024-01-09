const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const blogUserSchema = mongoose.Schema({
  name : {
    type : String,
    require : true
  },
  email : {
    type : String,
    unique : true,
    require : true
  },
  password : {
    type : String,
    require : true
  }
},
{
  timestamps : true
});

// hash password and save
blogUserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

const blogUserModel = mongoose.model("blogUser", blogUserSchema);

module.exports = blogUserModel;