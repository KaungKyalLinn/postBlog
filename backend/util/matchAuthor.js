const bcrypt = require("bcrypt");

const matchAuthor = (cookieAuthor, postAuthor) => {
  return bcrypt.compare(cookieAuthor, postAuthor);
}

module.exports = matchAuthor;