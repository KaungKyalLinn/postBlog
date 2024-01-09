const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const dbConnect = require("./db/dbConnect");
const port = process.env.PORT || 5000;
const errorHandling = require("./middleware/errorHandling")

const app = express();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/read", require("./routes/customerRoute"));
app.use("/api/user", require("./routes/blogUserRoute"));
app.use("/api/blog", require("./routes/blogPostRoute"));

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"))
  })
}else{
  res.send("please make sure in production")
}

app.use(errorHandling.notFoundError)
app.use(errorHandling.generalError)

app.listen(port, () => {
  console.log("server start running at port : " , port)
});