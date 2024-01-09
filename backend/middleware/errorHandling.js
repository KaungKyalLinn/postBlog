const notFoundError = (req, res, next) => {
  res.status(404)
  const notFound = new Error("this site can't be reach. page not found > " + req.originalUrl);
  next(notFound)
}

const generalError = (err, req, res, next) => {
  const errorStatus = res.statusCode ? res.statusCode : 500;
  res.status(errorStatus).json({
    message : err.message,
    stack : process.env.NODE_ENV === "development" ? err.stack : null
  })
}

const errorHandling = {
  notFoundError,
  generalError
}

module.exports = errorHandling;