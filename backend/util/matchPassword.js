const bcrypt = require("bcrypt");

const matchPassword = (enteredPassword, userPassword) => {
  return bcrypt.compare(enteredPassword, userPassword);
}

module.exports = matchPassword;