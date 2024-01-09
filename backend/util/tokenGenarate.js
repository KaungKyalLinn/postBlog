const jwt = require("jsonwebtoken")

const tokenGenarate = (res, id) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn : "30d"})
  res.cookie("jwt", token, {
    httpOnly : true,
    secure : process.env.NODE_ENV !== "development",
    maxAge : 30 * 24 * 60 * 60 * 1000,
    sameSite : "strict"
  })
}

module.exports = tokenGenarate;