const bcrypt = require("bcryptjs"); // for encrypting the password
const JWT = require("jsonwebtoken"); // for initializing token
const secret = "ahsifsahiahrfvbfkjagfilrb5tikljref";
const JWTD = require("jwt-decode"); // for decode the token

// hashing
const hashing = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10); // generating salt
    const hash = await bcrypt.hash(value.toString(), salt); // hashing with generated salt and converting to string hash function accept the string
    return hash;
  } catch (e) {
    console.log("bcrypt hash error", e);
  }
};

// hashCompare

// comparing hashed password(db) with the req password from client
const hashCompare = async (currentValue, hashPassword) => {
  try {
    return await bcrypt.compare(
      currentValue.toString(),
      hashPassword.toString()
    );
  } catch (e) {
    console.log("bcrypt compare error", e);
  }
};

// create token
const createToken = async (username, email) => {
  try {
    // sign func ("data", secret code, expiration time)
    return JWT.sign(
      {
        username,
        email,
      },
      secret,
      {
        expiresIn: "5m",
      }
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = { hashing, hashCompare, createToken };
